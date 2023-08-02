from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

import json
# json-response-maker


def jrm(status, message):
    res = {
        "status": status,
        "message": message
    }

    return JsonResponse(res, status=status)


@csrf_exempt
def testapi(request):
    res = json.loads(request.POST['form'])
    print(res['username'])
    print(dir(request.FILES['imagefile']))
    return jrm(200, "heheh")
