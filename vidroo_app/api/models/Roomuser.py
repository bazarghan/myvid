# from django.db import models


# class Roomuser(models.Model):
#     userid = models.IntegerField()
#     roomkey = models.CharField(max_length=7)

#     def __str__(self):
#         return self.roomkey


from django.db import models
from .User import User
from .Room import Room


class Roomuser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    chat_permission = models.BooleanField()
    video_permission = models.BooleanField()
    online = models.BooleanField(default=False)
    video_open = models.BooleanField(default=False)
    channel_room = models.CharField(max_length=100, blank=True)
    channel_chat = models.CharField(max_length=100, blank=True)
    channel_video = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.room.key
