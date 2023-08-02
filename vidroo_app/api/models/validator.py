import re


class Uservalidator:

    def __init__(self, password_min_length, email_max_length, email_min_length,
                 username_max_length, username_min_length):
        self.password_min_length = password_min_length
        self.email_max_length = email_max_length
        self.email_min_length = email_min_length
        self.username_max_length = username_max_length
        self.username_min_length = username_min_length

    ######password validation ##############

    def password(self, password):
        passworderror = ''
        res = True

        if (len(password) < self.password_min_length):
            passworderror = 'password_min_length_error'
            res = False

        return res, passworderror

    #########email validation #################
    def email(self, email, emailchecking):
        emailerror = ''
        res = True
        regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'

        if (emailchecking):
            emailerror = 'email_uniqueness_error'
            res = False

        if (len(email) > self.email_max_length):
            emailerror = 'email_max_length_error'
            res = False
        if (len(email) < self.email_min_length):
            emailerror = 'email_min_length_error'
            res = False

        if (not re.fullmatch(regex, email)):
            emailerror = 'email_valid_error'
            res = False

        return res, emailerror

    #######username validation##########

    def username(self, username, userchecking):
        usererror = ''
        res = True

        if (len(username) > self.username_max_length):
            usererror = 'username_max_length_error'
            res = False

        if (len(username) < self.username_min_length):
            usererror = 'username_min_length_error'
            res = False

        if (userchecking):
            usererror = 'usernaem_uniqueness_error'
            res = False

        return res, usererror

    # validating the user creation

    def createuser(self, username, email, password, emailchecking, userchecking):
        usererror = ''
        emailerror = ''
        passworderror = ''
        res = True
        if (not self.username(username, userchecking)[0]):
            usererror = self.username(username, userchecking)[1]
            res = False

        if (not self.password(password)[0]):
            passworderror = self.password(password)[1]
            res = False

        if (not self.email(email, emailchecking)[0]):
            emailerror = self.email(email, emailchecking)[1]
            res = False

        response = {
            'usererror': usererror,
            'passworderror': passworderror,
            'emailerror': emailerror
        }
        return res, response

    def updateuser(self, emailchecking, **kwargs):
        emailerror = ''
        passworderror = ''
        res = True
        email = ''
        password = ''
        if ('password' in kwargs):
            password = kwargs['password']
            if (not self.password(password)[0]):
                passworderror = self.password(password)[1]
                res = False

        if ('email' in kwargs):
            email = kwargs['email']
            if (not self.email(email, emailchecking)[0]):
                emailerror = self.email(email, emailchecking)[1]
                res = False

        response = {
            'passworderror': passworderror,
            'emailerror': emailerror
        }
        return res, response
