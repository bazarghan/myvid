from base64 import urlsafe_b64encode, urlsafe_b64decode
from hashlib import sha256
import hmac

from backend.settings import SECRET_KEY

# SECRET_KEY = 'skdfljs'
HEADER = {"typ": "JWT", "alg": "HS256"}
DURTIME = 3600*240 #SECONDS OF EXPIRATIONTIME


#removing the == char from base64url 
def base64UrlEncode(data):
    return urlsafe_b64encode(data).decode('utf-8').replace('=','') 

def base64UrlDecode(base64Url):
    padding = b'=' * (4 - (len(base64Url) % 4))
    return urlsafe_b64decode(base64Url.encode('utf-8') + padding)


def signature(msg):
    key = SECRET_KEY.encode()
    msg = msg.encode()
    return hmac.new(key, msg,sha256).digest()