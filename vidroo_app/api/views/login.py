from api.models.User import User
from api.responses.responsemake import responsemaker
from django.views.decorators.csrf import csrf_exempt
from hashlib import sha256
from django.http import JsonResponse, HttpResponse
import json
from myjwt.authentication import authenticate_accesstoken
from myjwt.token import create_access_token, create_refresh_token


@csrf_exempt
def login(request):

    #########authentication part###############
    res = authenticate_accesstoken(request)
    if res[0]:
        return JsonResponse(responsemaker(200), status=200)
    elif (res[1]['status'] == 401):
        return JsonResponse(res[1], status=401)
    ###########################################

    if (request.method == "OPTIONS"):
        allowed_methods = ['get', 'post', 'put', 'delete', 'options']
        response = HttpResponse()
        response['allow'] = ','.join(allowed_methods)
        return response

    if (request.method == "GET"):
        return JsonResponse(responsemaker(404), status=404)

    if (request.method == "POST"):
        body = json.loads(request.body.decode("utf8"))

        username = ""
        password = ""
        if ('username' in body):
            username = body['username']
        else:
            return JsonResponse(responsemaker(400), status=400)
        if ('password' in body):
            password = sha256(body['password'].encode('utf8')).hexdigest()
        else:
            return JsonResponse(responsemaker(400), status=400)

        user = User.objects.filter(username=username)
        if (not user.exists()):
            return JsonResponse(responsemaker(403), status=403)

        if (user[0].password == password):
            access_token = create_access_token(user[0].id)
            refresh_token = create_refresh_token(user[0].id)
            token = {
                "accesstoken": access_token,
                "refreshtoken": refresh_token
            }
            response = responsemaker(200)
            response['token'] = token
            return JsonResponse(response, status=200)
        else:

            return JsonResponse(responsemaker(403), status=403)

    return JsonResponse(responsemaker(404), status=404)
