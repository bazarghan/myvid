from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from api.models.User import User
from api.models.Room import Room
from api.responses.responsemake import responsemaker

from myjwt.authentication import authenticate_accesstoken


@csrf_exempt
def panel(request):

    #########authentication part###############
    res = authenticate_accesstoken(request)
    if res[0]:
        userid = res[1]
        user = User.objects.get(id=userid)
        profile = user.profile
        rooms = Room.objects.filter(owner=user)
        key = ""
        if (rooms.exists()):
            key = rooms[0].key

        user = {
            "username": profile.username,
            "firstname": profile.firstname,
            "lastname": profile.lastname,
            "email": profile.email,
            "phone": profile.phone,
            "gender": profile.gender,
            "age": profile.age,
            "profileimageurl": profile.profileimage.url,
            "roomkey": key
        }
        response = responsemaker(200)
        response['profile'] = user
        return JsonResponse(response, status=200)
    elif (res[1]['status'] == 401):
        return JsonResponse(res[1], status=res[1]['status'])
    ###########################################

    return JsonResponse(responsemaker(404), status=404)
