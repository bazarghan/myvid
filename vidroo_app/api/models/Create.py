from django.http import JsonResponse
from django.core import serializers

from random import choices
import string
import json

from .User import User
from .Room import Room
from .Roomuser import Roomuser
from api.responses.responsemake import responsemaker


def room_create(userid, name):
    owner = User.objects.get(id=userid)
    if (len(name) > 40):
        return JsonResponse(responsemaker(400), status=400)
    key = ''
    while (True):
        key = ''.join(choices(string.ascii_letters, k=6))
        if (not Room.objects.filter(key=key).exists()):
            break
    room = Room(name=name, key=key, owner=owner,)
    room.save()
    roomuser = Roomuser(user=owner, room=room, chat_permission=room.chat_permission,
                        video_permission=room.video_permission)
    roomuser.save()

    myroom = Room.objects.filter(key=key)
    data = json.loads(serializers.serialize("json", myroom))
    response = responsemaker(201)
    response['room'] = data
    return JsonResponse(response, status=201)
