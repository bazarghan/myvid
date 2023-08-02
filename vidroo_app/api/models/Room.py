from django.db import models
from django.http import JsonResponse
from django.core import serializers

import json


from .User import User

from api.responses.responsemake import responsemaker


class Room(models.Model):
    name = models.CharField(max_length=40)
    key = models.CharField(max_length=7, unique=True, primary_key=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    chat_permission = models.BooleanField(default=True)
    video_permission = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    @classmethod
    def update(cls, userid, key, **kwargs):
        room = Room.objects.filter(key=key)
        if (not room.exists()):
            return JsonResponse(responsemaker(404), status=404)

        room = room[0]
        if (not room.owner.id == userid):
            return JsonResponse(responsemaker(403), status=403)

        if ("name" in kwargs):
            room.name = kwargs["name"]
        if ("chat_permission" in kwargs):
            room.chat_permission = kwargs["chat_permission"]
        if ("video_permission" in kwargs):
            room.video_permission = kwargs["video_permission"]

        room.save()
        data = json.loads(serializers.serialize("json", room))
        response = responsemaker(200)
        response['room'] = data
        return JsonResponse(response, status=200)
