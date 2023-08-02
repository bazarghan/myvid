from .token import verfication
from .signature import base64UrlDecode
from api.responses.responsemake import responsemaker

# authenticating accesstoken


def authenticate_accesstoken(request):
    key = "accesstoken"
    header = request.headers

    if (key in header):
        verfiy = verfication(header[key], "accesstoken")
        userid = verfiy[2]
        access = verfiy[1]
        res = verfiy[0]
        if access:
            return True, userid
        else:
            return False, res
    else:
        return False, responsemaker(498)

# authenticating the refresth token


def authenticate_refreshtoken(request):
    key = "refreshtoken"
    header = request.headers

    if (key in header):
        verfiy = verfication(header[key], "refreshtoken")
        userid = verfiy[2]
        access = verfiy[1]
        res = verfiy[0]
        if access:
            return True, userid
        else:
            return False, res
    else:
        # res = {'status': 403, 'message': 'no refreshtoken'}
        return False, responsemaker(498)

# authenticating the websocket


def authenticate_websocket(request):
    key = "accesstoken"

    if (key in request):
        try:
            token = base64UrlDecode(request[key]).decode('utf8')
        except:
            return False, responsemaker(498)
        verfiy = verfication(token, "accesstoken")
        userid = verfiy[2]
        access = verfiy[1]
        res = verfiy[0]
        if access:
            return True, userid
        else:
            return False, res
    else:
        # res = {'status': 403, 'message': 'no accesstoken'}
        return False, responsemaker(498)
