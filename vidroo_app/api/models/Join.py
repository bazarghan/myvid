from django.db import models
from .User import User
from .Room import Room


class JoinRoom(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    channel_name = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.user.username
