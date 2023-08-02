from django.db import models


class Profile(models.Model):
    GENDER_CHOICES = (
        ("m", "male"),
        ("f", "female")
    )
    username = models.CharField(max_length=40, unique=True)
    firstname = models.CharField(max_length=40, blank=True)
    lastname = models.CharField(max_length=40, blank=True)
    age = models.IntegerField(blank=True, default=5)
    gender = models.CharField(
        max_length=10,
        choices=GENDER_CHOICES,
        default="m")
    email = models.EmailField(max_length=256)
    phone = models.CharField(max_length=13, blank=True)
    profileimage = models.ImageField(
        null=True, blank=True, upload_to="images/")

    def __str__(self):
        return self.username
