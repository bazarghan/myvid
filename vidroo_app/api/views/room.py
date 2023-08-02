from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.http import JsonResponse

import json

from api.models.User import User
from api.models.Room import Room
from api.models.Roomuser import Roomuser

from api.models.Create import room_create

from api.responses.responsemake import responsemaker
from myjwt.authentication import authenticate_accesstoken


@csrf_exempt
def room(request, key):

    #########authentication part###############
    res = authenticate_accesstoken(request)
    if not res[0]:
        if (res[1]['status'] == 401):
            return JsonResponse(res[1], status=401)
        return JsonResponse(responsemaker(498), status=498)
    ###########################################
    user = User.objects.get(id=res[1])

    if (request.method == "GET"):
        if (key == "all"):
            rooms = Room.objects.filter(owner=user)

            data = serializers.serialize("json", rooms)

            data = json.loads(data)
            response = responsemaker(200)
            response['rooms'] = data
            return JsonResponse(response, status=200)

        else:
            theroom = Room.objects.filter(key=key)
            if (not theroom.exists()):
                return JsonResponse(responsemaker(404), status=404)

            roomuser = Roomuser.objects.filter(user=user, room=theroom[0])

            if (not roomuser.exists()):
                return JsonResponse(responsemaker(403), status=403)

            roomusers = Roomuser.objects.filter(room=theroom[0])
            data = serializers.serialize("json", theroom)
            data = json.loads(data)

            userdata = []
            for user in roomusers:
                myobj = {
                    "username": user.user.username,
                    "imageurl": user.user.profile.profileimage.url,
                    "chat_permission": user.chat_permission,
                    "video_permission": user.video_permission,
                    "online": user.online,
                    "owner": user.user == theroom[0].owner
                }
                userdata.append(myobj)

            response = responsemaker(200)
            response['room'] = data
            response['roomuser'] = userdata
            return JsonResponse(response, status=200)

    if (request.method == "POST"):
        if (not key == "create"):
            return JsonResponse(responsemaker(400), status=400)
        try:
            body = json.loads(request.body.decode("utf8"))
            return room_create(res[1], body['name'])
        except:
            return JsonResponse(responsemaker(400), status=400)

    if (request.method == "PUT"):
        # try:

        body = json.loads(request.body.decode("utf8"))
        return Room.update(res[1], key, **body)
        # except:
        #     return jrm(400, "bad_request")

    if (request.method == "DELETE"):
        try:
            room = Room.objects.filter(key=key)
            if (not room.exists()):
                return JsonResponse(responsemaker(404), status=404)
            room = room[0]
            if (not room.owner == user):
                return JsonResponse(responsemaker(403), status=403)
            room.delete()
            return JsonResponse(responsemaker(200), status=200)
        except:
            return JsonResponse(responsemaker(400), status=400)
