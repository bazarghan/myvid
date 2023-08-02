from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse


from api.models.User import User
from api.models.Room import Room
from api.models.Roomuser import Roomuser


from api.responses.responsemake import responsemaker
from myjwt.authentication import authenticate_accesstoken


def serializer(roomusers, user):
    data = []
    for myroom in roomusers:
        number_of_users = len(Roomuser.objects.filter(room=myroom.room))

        obj = {
            "name": myroom.room.name,
            "key": myroom.room.key,
            "memberNum": number_of_users,
            "check": myroom.room.owner == user
        }
        data.append(obj)

    res = responsemaker(200)
    res['rooms'] = data
    return JsonResponse(res, status=200)


@csrf_exempt
def roomuser(request, **kwargs):

    key = False
    if ('key' in kwargs):
        key = kwargs['key']
    #########authentication part###############
    res = authenticate_accesstoken(request)
    if not res[0]:
        if (res[1]['status'] == 401):
            return JsonResponse(res[1], status=401)
        return JsonResponse(responsemaker(498), status=498)
    ###########################################

    user = User.objects.get(id=res[1])

    roomuser = Roomuser.objects.filter(user=user)

    if (not roomuser.exists()):
        return JsonResponse(responsemaker(404), status=404)

    roomuser = roomuser[0]

    if (request.method == "GET"):
        roomusers = Roomuser.objects.filter(user=user)
        return serializer(roomusers, user)

    if (key):

        room = Room.objects.filter(key=key)

        if (not room.exists()):
            return JsonResponse(responsemaker(404), status=404)
        room = room[0]

        if (request.method == "DELETE"):
            if (room.owner == user):
                room.delete()
            else:
                try:
                    roomuser = Roomuser.objects.get(room=room, user=user)
                    roomuser.delete()
                except:
                    return JsonResponse(responsemaker(400), status=400)

            roomuser = Roomuser.objects.filter(user=user)

            if (not roomuser.exists()):
                return JsonResponse(responsemaker(404), status=404)

            return serializer(roomuser, user)

    JsonResponse(responsemaker(404), status=404)
