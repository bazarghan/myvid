from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
import json

from myjwt.authentication import authenticate_websocket

from api.models.Roomuser import Roomuser
from api.models.Room import Room
from api.models.User import User


class Auth(WebsocketConsumer):

    def jrm(self, status, message):
        self.send(json.dumps({
            "status": status,
            "message": message
        }))

    def connect(self):

        self.room_name = self.scope['url_route']['kwargs']['room_key']
        self.connected = False
        #########is he logged in the website if yes what is his username################
        res = authenticate_websocket(self.scope['url_route']['kwargs'])
        if not res[0]:
            # self.accept()
            if (res[1]['message'] == 'expired'):
                # self.send(json.dumps(res[1]))
                self.close()
                return False
            else:
                # self.jrm(403, "Access_denied")
                self.close()
                return False

        #########is this room exist if it is is he Allowed to join this room###########

        user = User.objects.get(id=res[1])
        room = Room.objects.filter(key=self.room_name)
        if (not room.exists()):
            self.close()
            return False
        room = room[0]
        self.user = Roomuser.objects.filter(user=user, room=room)
        if (not self.user.exists()):
            self.close()
            return False

        self.user = self.user[0]
        self.user.online = True

        return True


#########kick functionality########################

    # def kick(self, userid):
    #     if (not self.owner):
    #         self.jrm(400, "bad_request")
    #         return False

    #     channel_name = Channel.objects.filter(
    #         userid=userid, group_name=self.room_group_name)
    #     if (not channel_name.exists()):
    #         self.jrm(400, "bad_request")
    #         return False
    #     cname = channel_name[0].channel_name  # channel name

    #     async_to_sync(self.channel_layer.group_discard)(
    #         self.room_group_name,
    #         cname
    #     )
    #     channel_name[0].delete()
    #     self.jrm(
    #         200, f"the user with id: {userid} has been kicked out of the room")
    #     user = Roomuser.objects.filter(
    #         userid=userid, roomkey=self.room_name)
    #     user[0].delete()
    #     return True


class ChatAuth(Auth):
    def connect(self):
        if (not super().connect()):
            return False

        ####create group name ###########
        self.room_group_name = 'chat_%s' % self.room_name

        ######save the person channel name in to the database###############
        self.user.channel_chat = self.channel_name
        self.user.save()
        #########add this person to the group and the accept the connection###############
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()
        self.connected = True
        return True

    def disconnect(self, close_code):
        if (self.connected):
            async_to_sync(self.channel_layer.group_discard)(
                self.room_group_name,
                self.channel_name
            )


class VideoAuth(Auth):
    def connect(self):
        if (not super().connect()):
            return False

        ####create group name ###########
        self.room_group_name = 'video_%s' % self.room_name

        ######save the person channel name in to the database###############
        self.user.channel_video = self.channel_name
        self.user.save()

        #########add this person to the group and the accept the connection###############
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()
        self.connected = True
        self.video_open = False
        self.start = False
        return True

    def disconnect(self, close_code):
        if (self.connected):
            async_to_sync(self.channel_layer.group_discard)(
                self.room_group_name,
                self.channel_name
            )

            roomuser = Roomuser.objects.filter(
                user=self.user.user, room=self.user.room)
            if (roomuser.exists()):
                roomuser = roomuser[0]
                roomuser.video_open = False
                roomuser.save()


class RoomAuth(Auth):
    def connect(self):
        if (not super().connect()):
            return False

        ####create group name ###########
        self.room_group_name = 'user_%s' % self.room_name

        ######save the person channel name in to the database###############
        self.user.channel_room = self.channel_name
        self.user.online = True
        self.user.save()
        #########add this person to the group and the accept the connection###############
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'room_message',
                'type_response': "newuser",
                "username": self.user.user.username,
                "imageurl": self.user.user.profile.profileimage.url,
                "chat_permission": self.user.chat_permission,
                "video_permission": self.user.video_permission,
                "online": self.user.online,
                "owner": self.user.user == self.user.room.owner
            }
        )
        self.connected = True
        return True

    def disconnect(self, close_code):
        if (self.connected):
            async_to_sync(self.channel_layer.group_discard)(
                self.room_group_name,
                self.channel_name
            )

            roomuser = Roomuser.objects.filter(
                user=self.user.user, room=self.user.room)
            if (roomuser.exists()):
                roomuser = roomuser[0]
                roomuser.online = False
                roomuser.save()
                async_to_sync(self.channel_layer.group_send)(
                    self.room_group_name,
                    {
                        'type': 'room_message',
                        'type_response': "newuser",
                        "username": roomuser.user.username,
                        "imageurl": roomuser.user.profile.profileimage.url,
                        "chat_permission": roomuser.chat_permission,
                        "video_permission": roomuser.video_permission,
                        "online": roomuser.online,
                        "owner": roomuser.user == roomuser.room.owner
                    }
                )
            elif (self.user.user == self.user.room.owner):
                async_to_sync(self.channel_layer.group_send)(
                    self.room_group_name, {
                        'type': 'room_command',
                        'command': 'delete',
                        'username': 'admin'

                    }
                )
            elif (self.user.user != self.user.room.owner):
                async_to_sync(self.channel_layer.group_send)(
                    self.room_group_name, {
                        'type': 'room_command',
                        'command': 'leave',
                        'username': self.user.user.username

                    }
                )
