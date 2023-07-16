const User = require('../../model/user')

const { ResponseStatus, ResponseMessages } = require("../../_enums")
const { ApiErrorHandler, ValidationHandler }                  = require("../../_utils/handler")
const { decodeToken }                      = require('../../_utils/guard')
const Responses                            = require('./responses')

const Authenticate = async (req, res, next) => {

    // const token = req.header('x-auth-token');


    // if(!token || !token.includes('Bearer')) // check valid token
    // return res.status(ResponseStatus.UNAUTHORIZED).send({ error: ResponseMessages.AUTH_ERROR })

    // const jwtToken = token.split(' ')[1]

    // if(jwtToken.length < 100) // check token length
    // return res.status(ResponseStatus.UNAUTHORIZED).send({ error: ResponseMessages.AUTH_ERROR })

    // const tokenData = await decodeToken(jwtToken)

    // if(!tokenData.success) // error in token
    // return res.status(ResponseStatus.UNAUTHORIZED).send({ error: tokenData.error })

    // const user = await User.findById(tokenData.data._id)

    // if(!user) // no user found
    // return res.status(ResponseStatus.UNAUTHORIZED).send({ error: Responses.User.NOT_FOUND })

    // req.user = user.toJSON()

    // next()

}


const CheckMerchant = async (req, res, next) =>{
    // const token = req.header('x-auth-token');

    // if(!token || !token.includes('Bearer')) // check valid token
    // return res.status(ResponseStatus.UNAUTHORIZED).send({ error: ResponseMessages.AUTH_ERROR })

    // const jwtToken = token.split(' ')[1]

    // if(jwtToken.length < 100) // check token length
    // return res.status(ResponseStatus.UNAUTHORIZED).send({ error: ResponseMessages.AUTH_ERROR })

    // const tokenData = await decodeToken(jwtToken)

    // if(!tokenData.success) // error in token
    // return res.status(ResponseStatus.UNAUTHORIZED).send({ error: tokenData.error })

    // const user = await User.findById(tokenData.data._id)

    // if(!user) // no user found
    // return res.status(ResponseStatus.UNAUTHORIZED).send({ error: Responses.User.NOT_FOUND })

    // req.user = user.toJSON()

    // // if(!req?.user?.types?.includes(3))
    // return res.status(ResponseStatus.UNAUTHORIZED).send({ error: Responses.User.NOT_PERMISSION})


    next()
}

const Validate = (schema, dataIn) => {
    return async (req, res, next) => {
        const {invalid, value} = ValidationHandler(schema, req[dataIn], res)
        if(invalid) return invalid()
        req.validValues = value
        next()
    }
}

const CheckAdmin = async (req, res, next) =>{
    // const token = req.header('x-auth-token');

    // if(!token || !token.includes('Bearer')) // check valid token
    // return res.status(ResponseStatus.UNAUTHORIZED).send({ error: ResponseMessages.AUTH_ERROR })

    // const jwtToken = token.split(' ')[1]

    // if(jwtToken.length < 100) // check token length
    // return res.status(ResponseStatus.UNAUTHORIZED).send({ error: ResponseMessages.AUTH_ERROR })

    // const tokenData = await decodeToken(jwtToken)

    // if(!tokenData.success) // error in token
    // return res.status(ResponseStatus.UNAUTHORIZED).send({ error: tokenData.error })

    // const user = await User.findById(tokenData.data._id)

    // if(!user) // no user found
    // return res.status(ResponseStatus.UNAUTHORIZED).send({ error: Responses.User.NOT_FOUND })

    // req.user = user.toJSON()

    // if(!req?.user?.types?.includes(1))
    // return res.status(ResponseStatus.UNAUTHORIZED).send({ error: Responses.User.NOT_PERMISSION})


    next()
}

module.exports = {
    Authenticate : ApiErrorHandler(Authenticate),
    CheckMerchant: ApiErrorHandler(CheckMerchant),
    CheckAdmin   : ApiErrorHandler(CheckAdmin),
    Validate     : (schema, dataIn) => ApiErrorHandler(Validate(schema, dataIn)),
}
