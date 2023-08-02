from django.db import models


class Chat(models.Model):
    userid = models.IntegerField()
    roomkey = models.CharField(max_length=7)
    text = models.TextField()

    def __str__(self):
        return self.roomkey
