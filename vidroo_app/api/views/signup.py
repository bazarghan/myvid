from datetime import datetime
from api.models.User import User
from django.views.decorators.csrf import csrf_exempt

from django.http import JsonResponse
import json
from myjwt.authentication import authenticate_accesstoken
from api.models.Userpreregister import Userpreregister

from api.responses.responsemake import responsemaker
# json-response-maker


def jrm(status, message):
    res = {
        "status": status,
        "message": message
    }

    return JsonResponse(res, status=status)


@csrf_exempt
def signup(request):

    #########authentication part###############
    res = authenticate_accesstoken(request)
    if res[0]:
        return JsonResponse(responsemaker(200), status=200)
    elif (res[1]['status'] == 401):
        return JsonResponse(res[1], status=401)
    ###########################################

    if (request.method == "GET"):
        return JsonResponse(responsemaker(404), status=404)

    if (request.method == "POST"):
        body = json.loads(request.body.decode("utf8"))
        if ('code' in body):
            code = body['code']
            try:
                preuser = Userpreregister.objects.filter(email=body['email'])
                if (len(preuser) == 0):
                    return JsonResponse(responsemaker(404), status=404)
                preuser = preuser[0]
                datenow = datetime.now().timestamp()

                if (preuser.code == code):
                    if (preuser.date > datenow):
                        try:
                            Userpreregister.objects.filter(
                                email=preuser.email).delete()

                            res = User.create(preuser.username,
                                              preuser.email, preuser.password)
                            return res
                        except:
                            return JsonResponse(responsemaker(400), status=400)
                    else:
                        return JsonResponse(responsemaker(450), status=450)
                else:
                    return JsonResponse(responsemaker(403), status=403)

            except:
                return JsonResponse(responsemaker(400), status=400)

        try:
            return Userpreregister.create(body['username'], body['email'], body['password'])
        except:
            return JsonResponse(responsemaker(400), status=400)
