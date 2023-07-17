const { ResponseStatus, ResponseMessages } = require("../../_enums")
const { ApiErrorHandler, ValidationHandler }                  = require("../../_utils/handler")
const { decodeToken }                      = require('../../_utils/guard')
const Responses                            = require('./responses')

require('dotenv').config();

const Authenticate = async (req, res, next) => {

    console.log('zee1')
    const token = req.header('x-auth-token');

    if(!token || !token.includes('Bearer')) // check valid token
    return res.status(ResponseStatus.UNAUTHORIZED).send({ error: ResponseMessages.AUTH_ERROR, status: ResponseStatus.UNAUTHORIZED })

    if(token !== ('Bearer ' + process.env.USERNAME +'&'+process.env.PASSWORD))
    return res.status(ResponseStatus.UNAUTHORIZED).send({ error: ResponseMessages.AUTH_ERROR, status: ResponseStatus.UNAUTHORIZED })

    next()

}

module.exports = {
    Authenticate : ApiErrorHandler(Authenticate),
}
