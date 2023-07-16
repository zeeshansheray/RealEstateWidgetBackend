const { ResponseStatus, UserTypes }   = require("../../_enums/enums")
const { userVld }                     = require("../../_validations")
const { SignUpService, LoginService, SendEmailService, ForgotPasswordService, UpdateUserService, GetUsersService } = require('./services')
const Responses                       = require('./responses')
const { getUniqueId }                 = require("../../_utils/utils")
const { generatePassHash }            = require("../../_utils/guard")
const { ValidationHandler }          = require('../../_utils/handler')

const SignUpCtrl = async (req, res) => {

    console.log('req' , req.body)

    const {invalid, value} = ValidationHandler(userVld.Signup, req.body, res)


    if(invalid) return invalid()

    const user = {
        ...value,
        uuid    : getUniqueId(16),
        name    : value.name,
        password: generatePassHash(value.password),
    }

    if(value.type) user.type = value.type

    const result = await SignUpService(user)

    return res.status(ResponseStatus.SUCCESS).send(result)
}

const LoginCtrl = async (req, res) => {
    console.log('here')
    const { invalid, value } = ValidationHandler(userVld.Login, req.body, res)

    if(invalid) return invalid()

    const result = await LoginService(value)

    if(!result.success)
    return res.status(ResponseStatus.BAD_REQUEST).send(result)

    return res.status(ResponseStatus.SUCCESS).send(result)

}

const SendEmail = async (req, res) => {
    const { invalid, value } = ValidationHandler(userVld.SendEmail, req.body, res)

    if(invalid) return invalid()

    const result = await SendEmailService(value)

    if(!result.success)
    return res.status(ResponseStatus.BAD_REQUEST).send(result)

    return res.status(ResponseStatus.SUCCESS).send(result)

}

const changePassword = async (req, res) => {
    const { invalid, value } = ValidationHandler(userVld.ForgotPassword, req.body, res)

    if(invalid) return invalid()

    const result = await ForgotPasswordService(value)

    if(!result.success)
    return res.status(ResponseStatus.BAD_REQUEST).send(result)

    return res.status(ResponseStatus.SUCCESS).send(result)

}

const UpdateUser = async (req, res) => {
    console.log('req body', req.body)
    const { invalid, value } = ValidationHandler(userVld.UpdateUser, req.body, res)


    if(invalid) return invalid()


    const result = await UpdateUserService(value)

    if(!result.success)
    return res.status(ResponseStatus.BAD_REQUEST).send(result)

    return res.status(ResponseStatus.SUCCESS).send(result)

}


const GetUsers = async (req, res) => {
    const result = await GetUsersService()

    return res.status(ResponseStatus.SUCCESS).send(result)
}

module.exports = {
    SignUpCtrl,
    LoginCtrl,
    SendEmail,
    changePassword,
    UpdateUser,
    GetUsers
}