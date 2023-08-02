from django.urls import re_path

from .consumers.chat import ChatConsumer
from .consumers.video import VideoConsumer
from .consumers.room import RoomConsumer
from .consumers.join import JoinConsumer


websocket_urlpatterns = [
    re_path(r'ws/roomchat/(?P<room_key>\w+)/(?P<accesstoken>\w+)/$',
            ChatConsumer.as_asgi()),
    re_path(r'ws/roomvideo/(?P<room_key>\w+)/(?P<accesstoken>\w+)/$',
            VideoConsumer.as_asgi()),

    re_path(r'ws/roomuser/(?P<room_key>\w+)/(?P<accesstoken>\w+)/$',
            RoomConsumer.as_asgi()),


    re_path(r'ws/roomjoin/(?P<room_key>\w+)/(?P<accesstoken>\w+)/$',
            JoinConsumer.as_asgi()),
]
