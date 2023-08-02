import json
from asgiref.sync import async_to_sync
from .Authenticate import ChatAuth
from api.models.Chat import Chat
from api.models.User import User


class ChatConsumer(ChatAuth):

    def receive(self, text_data):

        text_data_json = json.loads(text_data)
        type = text_data_json['type']
        if (type == 'command'):
            command = text_data_json['command']
            userid = text_data_json['userid']
            if (command == '/kick'):
                self.kick(userid)
        elif (type == 'message'):
            message = text_data_json['message']
            chat = Chat(userid=self.user.user.id,
                        roomkey=self.room_name, text=message)
            chat.save()
            name = self.user.user.username

            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'type_response': type,
                    'name': name,
                    'message': message,
                }
            )

    def chat_message(self, event):
        type = event['type_response']
        name = event['name']
        message = event['message']

        self.send(text_data=json.dumps({
            'type': type,
            'name': name,
            'message': message
        }))
