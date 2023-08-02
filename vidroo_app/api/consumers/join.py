from distutils.log import error
import json
from os import access
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


from myjwt.authentication import authenticate_websocket
from api.models.Room import Room
from api.models.User import User
from api.models.Roomuser import Roomuser
from api.models.Join import JoinRoom


class JoinConsumer(WebsocketConsumer):

    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_key']
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

        self.accept()

        self.error = {
            "type": "error",
            "message": "Invaid Request"
        }
        self.success = {
            "type": "success",
            "message": "access Granted"
        }
        self.failure = {
            "type": "failed",
            "message": "access Denied"
        }

        self.user = User.objects.get(id=res[1])
        self.room = Room.objects.filter(key=self.room_name)

        if (not self.room.exists()):
            self.send(text_data=json.dumps(error))
            self.disconnect()

        self.room = self.room[0]
        join = JoinRoom.objects.filter(user=self.user, room=self.room)
        if (not join.exists()):
            join = JoinRoom(user=self.user, room=self.room,
                            channel_name=self.channel_name)
            join.save()
        else:
            join = join[0]
            join.channel_name = self.channel_name
            join.save()

        admin_channel_name = Roomuser.objects.get(
            room=self.room, user=self.room.owner).channel_room

        async_to_sync(self.channel_layer.send)(admin_channel_name, {
            "type": "joinrequest",
            "username": self.user.username,
            "userid": self.user.id
        })

    def disconnect(self, close_code):
        self.close()

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        type = text_data_json['type']
        message = text_data_json['message']

        self.send(text_data=json.dumps({
            "type": type,
            "message": message
        }))

    def joinrequest(self, event):
        access = event['access']
        self.send(text_data=json.dumps({
            "type": "join",
            "access": access
        }))
