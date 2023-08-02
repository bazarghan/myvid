INVALID_RESPONSE = {
    400:
    {
        "status": 400,
        "message": "Bad Request"
    },
    401:
    {
        "status": 401,
        "message": "Expired Token"
    },
    402:
    {
        "status": 402,
        "message": "Payment Required"
    },
    403:
    {
        "status": 403,
        "message": "Access Denied"
    },
    404:
    {
        "status": 404,
        "message": "Not Found"
    },
    409:
    {
        "status": 409,
        "message": "Conflict Happend"
    },
    450:
    {
        "status": 450,
        "message": "Expired Code"
    },
    498:
    {
        "status": 498,
        "message": "Invalid Token"
    },
}


VALID_RESPONSE = {
    200:
    {
        "status": 200,
        "message": "Success"
    },
    201:
    {
        "status": 201,
        "message": "Successfuly Created"
    },
    202:
    {
        "status": 202,
        "message": "Successfuly Deleted"
    }
}
