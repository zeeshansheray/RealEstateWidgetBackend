const SignupResponse = {
    CREATED             : 'user successfully created',
    ERROR               : 'error creating user',
    ALREADYEXISTS       : 'user already exists',
}

const LoginResponse = {
    LOGGEDIN            : 'user successfully login',
    USER_NOT_FOUND      : 'user not found',
    PASS_MISMATCH       : 'password mismatch',
    ERROR               : 'error loging in the user',
}

const EmailSend = {
    SUCCESS: 'email sent sucessfully',
    ERROR : 'cannot send email',
}

const PasswordChange = {
    SUCCESS: 'password changed sucessfully',
    ERROR  : 'error changing the password',
}


const Update = {
    SUCCESS: 'User updated sucessfully',
    ERROR  : 'error updating the user',
}



module.exports = {
    SignupResponse,
    LoginResponse,
    EmailSend,
    PasswordChange,
    Update
}