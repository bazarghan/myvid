import json
from asgiref.sync import async_to_sync
from .Authenticate import VideoAuth
from api.models.Roomuser import Roomuser
from api.models.Room import Room


class VideoConsumer(VideoAuth):

    def receive(self, text_data):

        self.start = True
        if (not self.user.video_open):

            myuser = Roomuser.objects.get(id=self.user.id)
            myuser.video_open = True
            myuser.save()
            self.user = myuser

        number = len(Roomuser.objects.filter(
            room=self.user.room, video_open=True))

        if (number == 1):
            self.video_open = True

        text_data_json = json.loads(text_data)

        type = text_data_json['type']

        if (type == 'command'):
            command = text_data_json['command']
            userid = text_data_json['userid']
            if (command == '/kick'):
                self.kick(userid)
        elif type == "control":
            control = text_data_json['control']
            value = text_data_json['value']
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'video_command',
                    'type_response': type,
                    'control': control,
                    'value': value,
                    'userid': self.user.user.id,
                }
            )

        elif type == "getinfo":
            command = text_data_json['command']
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'video_info',
                    'type_response': type,
                    'command': command,
                    'userid': self.user.user.id,
                }
            )
        elif type == "sendinfo":

            command = text_data_json['command']
            data = text_data_json['data']

            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'video_info',
                    'type_response': type,
                    'command': command,
                    'data': data,
                    'userid': self.user.user.id,
                }
            )

    def video_command(self, event):
        # userid = event['userid']
        # if (self.user.user.id == userid):
        #     return
        if (not self.start):
            return
        type = event['type_response']
        control = event['control']
        value = event['value']
        self.send(text_data=json.dumps({
            'type': type,
            'control': control,
            'value': value,

        }))

    def video_info(self, event):
        # userid = event['userid']
        # if (self.user.user.id == userid):
        #     return

        if (not self.start):
            return
        type = event['type_response']

        if (type == "getinfo" and self.video_open):

            command = event['command']
            self.send(text_data=json.dumps({
                'type': type,
                'command': command,
            }))

        elif (type == "sendinfo" and not self.video_open):

            command = event['command']
            data = event['data']
            self.send(text_data=json.dumps({
                'type': type,
                'command': command,
                'data': data
            }))
            self.video_open = True
