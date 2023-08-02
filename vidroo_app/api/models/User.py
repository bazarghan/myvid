from django.db import models
from .Profile import Profile
from django.http import JsonResponse
from hashlib import sha256
from .validator import Uservalidator
from myjwt.token import create_access_token, create_refresh_token
from avatar.avatarmaker import makeavatar


class User(models.Model):

    username = models.CharField(unique=True, max_length=30)
    email = models.EmailField(unique=True,)
    password = models.CharField(max_length=128)
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE)

    def __str__(self):
        return self.username

    @classmethod
    def create(cls, username, email, password):
        makeavatar(username)

        profile = Profile(username=username, email=email,
                          profileimage="images/"+username+".jpg")
        profile.save()
        user = User(username=username, email=email,
                    password=password, profile=profile)
        user.save()
        userid = User.objects.get(username=username).id
        access_token = create_access_token(userid)
        refresh_token = create_refresh_token(userid)
        token = {
            "accesstoken": access_token,
            "refreshtoken": refresh_token
        }
        response = {
            "status": 201,
            "message": "signup-Success",
            "token": token
        }

        return JsonResponse(response, status=201)

    @classmethod
    def update(cls, username, **kwargs):
        emailchecking = True
        if ('email' in kwargs):
            emailchecking = User.objects.filter(
                email=kwargs['email']).exists()

        check, res = Uservalidator.updateuser(emailchecking, **kwargs)

        if (check):
            user = User.objects.filter(usernamae=username)
            profile = Profile.objects.filter(username=username)
            if ('email' in kwargs):
                user.update(email=kwargs['email'])
                profile.update(email=kwargs['email'])

            if ('password' in kwargs):
                user.update(password=kwargs['password'])

            response = {
                "status": 201,
                "message": "updated secussfuly"
            }

            return response

        else:
            response = {
                "status": 400,
                "message": res
            }
            return response
