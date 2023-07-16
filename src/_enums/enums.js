const ENV = {
    PRODUCTION      : 'production',
    DEVELOPMENT     : 'development'
}
const ReqMethods = {
    GET     : 'get',
    POST    : 'post',
    PUT     : 'put',
    DELETE  : 'delete'
}

const OrderStatus = {
    RECIEVED    : "recieved",
    PAID        : "paid",
    COMPLETE    : "complete",
    CANCELLED   : "cancelled"
 }

 
const ResponseStatus = {
    SUCCESS         : 200,
    BAD_REQUEST     : 400,
    UNAUTHORIZED    : 401,
    FORBIDDEN       : 403,
    NOT_FOUND       : 404,
    INTERNAL_ERROR  : 500,
}

const ResponseMessages = {
    VALIDATION_ERROR    : 'Invalid or missing field'
}

const UserTypes = {
    ADMIN       : 1,
    CUSTOMER    : 2,
    MARKETER    : 3
}


module.exports = {
    ENV,
    ReqMethods,
    ResponseStatus,
    ResponseMessages,
    UserTypes,
    OrderStatus
}