from distutils.log import FATAL
from .signature import signature, base64UrlDecode, base64UrlEncode
from datetime import datetime
import json
from api.responses.responsemake import responsemaker
# SECRET_KEY = 'skdfljs'
HEADER = {"typ": "JWT", "alg": "HS256"}
DURATION_ACCESS = 3*3600  # SECONDS OF EXPIRATIONTIME
DURATION_REFRESH = 3600*24*10


def create_access_token(userid):
    payload = {'userid': userid,
               'type': 'accesstoken',
               'exp': datetime.now().timestamp() + DURATION_ACCESS,

               }
    json_header = json.dumps(HEADER, separators=(",", ":")).encode()
    json_payload = json.dumps(payload, separators=(",", ":")).encode()
    msg = base64UrlEncode(json_header)+"."+base64UrlEncode(json_payload)
    tokensignture = base64UrlEncode(signature(msg))
    return msg+"."+tokensignture


def create_refresh_token(userid):
    payload = {'userid': userid,
               'type': 'refreshtoken',
               'exp': datetime.now().timestamp() + DURATION_REFRESH,

               }
    json_header = json.dumps(HEADER, separators=(",", ":")).encode()
    json_payload = json.dumps(payload, separators=(",", ":")).encode()
    msg = base64UrlEncode(json_header)+"."+base64UrlEncode(json_payload)
    tokensignture = base64UrlEncode(signature(msg))
    return msg+"."+tokensignture


def verfication(token, tokentype):
    content = token.split(".")

    if len(content) != 3:
        return responsemaker(498), False, -1

    msg = content[0]+"."+content[1]
    tokensignture = base64UrlEncode(signature(msg))

    if tokensignture != content[2]:
        return responsemaker(498), False, -1

    timenow = datetime.now().timestamp()
    payload = json.loads(base64UrlDecode(content[1]).decode())

    if (payload['type'] != tokentype):
        return responsemaker(498), False, -1

    if (payload['exp'] < timenow):
        return responsemaker(401), False, -1

    return responsemaker(200), True, payload['userid']
