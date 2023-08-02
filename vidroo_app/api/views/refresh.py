from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from api.responses.responsemake import responsemaker
from myjwt.authentication import authenticate_refreshtoken
from myjwt.token import create_access_token


@csrf_exempt
def refresh(request):
    if (request.method == "GET"):
        res = authenticate_refreshtoken(request)
        if res[0]:
            access_token = create_access_token(res[1])
            response = responsemaker(200)
            response['accesstoken'] = access_token
            return JsonResponse(response, status=200)
        elif (res[1]['status'] == 401):
            return JsonResponse(res[1], status=401)
        elif (res[1]['status'] == 498):
            return JsonResponse(res[1], status=498)

    return JsonResponse(responsemaker(404), status=404)
