from email import message
from telnetlib import STATUS
from urllib import response
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from api.responses.responsemake import responsemaker
from api.models.User import User


@csrf_exempt
def validator(request, key1, key2):
    if (request.method == "GET"):

        if (key1 == "email"):
            user = User.objects.filter(email=key2)
            if (not user.exists()):
                return JsonResponse(responsemaker(200), status=200)
            else:
                res = responsemaker(409)
                res["detail"] = "email"
                return JsonResponse(res, status=200)

        if (key1 == "username"):
            user = User.objects.filter(username=key2)
            if (not user.exists()):
                return JsonResponse(responsemaker(200), status=200)
            else:
                res = responsemaker(409)
                res["detail"] = "username"
                return JsonResponse(res, status=200)

    return JsonResponse(responsemaker(404), status=404)
