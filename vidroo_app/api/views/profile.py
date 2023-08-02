from api.models.User import User
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from myjwt.authentication import authenticate_accesstoken
from hashlib import sha1
from api.responses.responsemake import responsemaker
import os


@csrf_exempt
def profile(request):

    #########authentication part###############
    res = authenticate_accesstoken(request)
    if not res[0]:
        if (res[1]['status'] == 401):
            return JsonResponse(res[1], status=res[1]['status'])
        return JsonResponse(responsemaker(498), status=498)
    ###########################################

    if (request.method == "GET"):
        userid = res[1]
        profile = User.objects.get(id=userid).profile
        user = {
            "username": profile.username,
            "firstname": profile.firstname,
            "lastname": profile.lastname,
            "emali": profile.email,
            "phone": profile.phone,
            "gender": profile.gender,
            "age": profile.age,
            "profileimageurl": profile.profileimage.url
        }
        response = responsemaker(200)
        response['profile'] = user
        return JsonResponse(response, status=200)

    if (request.method == "POST"):
        userid = res[1]
        profile = User.objects.get(id=userid).profile
        try:
            body = json.loads(request.POST['body'])
            file = request.FILES

            if ("profileimage" in file):
                url = "media" + profile.profileimage.url
                if (os.path.exists(url)):
                    os.remove(url)
                profile.profileimage = file['profileimage']

            if ("firstname" in body):
                profile.firstname = body['firstname']

            if ("lastname" in body):
                profile.lastname = body['lastname']

            if ("age" in body):
                profile.age = int(body['age'])
            if ("gender" in body):
                profile.gender = body['gender']
            if ("phone" in body):
                profile.phone = body['phone']
            profile.save()

            user = {
                "username": profile.username,
                "firstname": profile.firstname,
                "lastname": profile.lastname,
                "emali": profile.email,
                "phone": profile.phone,
                "gender": profile.gender,
                "age": profile.age,
                "profileimageurl": profile.profileimage.url
            }
            response = responsemaker(200)
            response['profile'] = user
            return JsonResponse(response, status=200)
        except:
            return JsonResponse(responsemaker(400), status=400)

    return JsonResponse(responsemaker(404), status=404)
