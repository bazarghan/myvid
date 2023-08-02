from django.db import models
from .Profile import Profile
from django.http import JsonResponse
from hashlib import sha256
from .validator import Uservalidator
from random import randint
from django.core.mail import send_mail
from .User import User
from datetime import datetime
from api.responses.responsemake import responsemaker


class Userpreregister(models.Model):

    username = models.CharField(unique=True, max_length=30)
    email = models.EmailField(unique=True,)
    password = models.CharField(max_length=128)
    date = models.IntegerField()
    code = models.CharField(max_length=8)

    def __str__(self):
        return self.username

    @classmethod
    def create(cls, username, email, password):
        emailchecking = User.objects.filter(email=email).exists()
        userchecking = User.objects.filter(
            username=username).exists()
        validation = Uservalidator(8, 40, 3, 40, 3)
        check, res = validation.createuser(
            username, email, password, emailchecking, userchecking)

        password = sha256(password.encode('utf-8')).hexdigest()
        if (check):

            code = randint(100000, 999999)
            date = datetime.now().timestamp()+180
            user = Userpreregister.objects.filter(email=email)
            if (len(user) == 0):
                newuser = Userpreregister(username=username, email=email,
                                          password=password, date=date, code=code)
                newuser.save()
            else:
                newuser = Userpreregister.objects.get(id=user[0].id)
                newuser.username = username
                newuser.code = code
                newuser.date = date
                newuser.save()

            send_mail("moviero-confirmation-code",
                      f"<h1>the code is: {code}</h1>", "Moviero", [email])

            response = responsemaker(201)
            response['detail'] = 'Email Sent'
            return JsonResponse(response, status=201)

        else:
            return JsonResponse(responsemaker(409), status=409)

    @classmethod
    def update(cls, username, **kwargs):
        emailchecking = True
        if ('email' in kwargs):
            emailchecking = Userpreregister.objects.filter(
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

            return JsonResponse(responsemaker(200), status=200)

        else:
            return JsonResponse(responsemaker(400), status=400)
