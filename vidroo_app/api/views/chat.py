from api.models.Chat import Chat
from api.models.User import User
from api.models.Roomuser import Roomuser
from api.models.Room import Room
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.http import JsonResponse
import json
from myjwt.authentication import authenticate_accesstoken
from api.responses.responsemake import responsemaker


@csrf_exempt
def chat(request, key):

    #########authentication part###############
    res = authenticate_accesstoken(request)
    if not res[0]:
        if (res[1]['status'] == 401):
            return JsonResponse(res[1], status=401)
        return JsonResponse(responsemaker(498), status=498)
    ###########################################

    user = User.objects.get(id=res[1])

    room = Room.objects.filter(key=key)
    if (not room.exists()):
        return JsonResponse(responsemaker(404), status=404)

    room = room[0]
    roomusers = Roomuser.objects.filter(user=user, room=room)

    if (not roomusers.exists()):
        return JsonResponse(responsemaker(403), status=403)

    if (request.method == "GET"):
        chats = Chat.objects.filter(roomkey=key)

        data = []
        for chat in chats:
            mychat = {
                "username": User.objects.get(id=chat.userid).username,
                "text": chat.text
            }
            data.append(mychat)

        response = responsemaker(200)
        response['chats'] = data
        return JsonResponse(response, status=200)
