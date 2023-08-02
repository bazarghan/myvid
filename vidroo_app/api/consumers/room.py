import json
from asgiref.sync import async_to_sync
from .Authenticate import RoomAuth
from api.models.User import User
from api.models.Join import JoinRoom

from api.models.Roomuser import Roomuser


class RoomConsumer(RoomAuth):

    def receive(self, text_data):

        text_data_json = json.loads(text_data)
        type = text_data_json['type']

        if (type == 'join'):

            if (self.user.room.owner == self.user.user):
                access = text_data_json['access']
                userid = text_data_json['userid']

                user = User.objects.get(id=userid)

                userchannel_name = JoinRoom.objects.filter(
                    user=user, room=self.user.room)[0].channel_name

                if (access):

                    roomuser = Roomuser(user=user, room=self.user.room, chat_permission=self.user.room.chat_permission,
                                        video_permission=self.user.room.video_permission)

                    roomuser.save()

                    async_to_sync(self.channel_layer.send)(
                        userchannel_name, {
                            "type": "joinrequest",
                            "access": True
                        }
                    )

                else:
                    async_to_sync(self.channel_layer.send)(
                        userchannel_name, {
                            "type": "joinrequest",
                            "access": False
                        }
                    )

    def room_message(self, event):
        type = event['type_response']

        if (type == "newuser"):

            self.send(text_data=json.dumps({
                'type': type,
                'user': {
                    "username": event['username'],
                    "imageurl": event['imageurl'],
                    "chat_permission": event['chat_permission'],
                    "video_permission": event['video_permission'],
                    "online": event['online'],
                    "owner": event['owner']
                }

            }))

    def room_command(self, event):
        command = event['command']
        username = event['username']
        self.send(text_data=json.dumps({
            'type': 'command',
            'command': command,
            'username': username
        }))

    def joinrequest(self, event):
        username = event['username']
        userid = event['userid']
        self.send(text_data=json.dumps({
            "type": "join",
            "username": username,
            "userid": userid
        }))
