from .response import INVALID_RESPONSE, VALID_RESPONSE


def responsemaker(status):
    res = VALID_RESPONSE
    if status >= 400:
        res = INVALID_RESPONSE
    if status in res:
        return res[status]
    else:
        return False
