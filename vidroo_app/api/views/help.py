from api.models.Help import Help
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.http import JsonResponse
import json
from myjwt.authentication import authenticate_accesstoken
from api.responses.responsemake import responsemaker


@csrf_exempt
def help(request):

    #########authentication part###############
    res = authenticate_accesstoken(request)
    if not res[0]:
        if (res[1]['status'] == 401):
            return JsonResponse(res[1], status=401)
        return JsonResponse(responsemaker(498), status=498)
    ###########################################

    if (request.method == "GET"):
        helps = Help.objects.all()
        data = serializers.serialize("json", helps)
        data = json.loads(data)
        response = responsemaker(200)
        response['helps'] = data
        return JsonResponse(response, status=200)

    return JsonResponse(responsemaker(404), status=404)
