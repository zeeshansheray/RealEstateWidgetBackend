const express = require('express')
const router = express.Router()

const { ReqMethods } = require('../../_enums/enums')
const { userVld }    = require("../../_validations")

const controllers = require('./controllers')

const { ApiErrorHandler } = require('../../_utils/handler')
const { Validate, Authenticate } = require('../../lib/auth/auth.services')


const Route = () => {
    const routes = [
        {
            method      : ReqMethods.POST,
            url         : '/signup',
            middlewares : [],
            fn          : ApiErrorHandler(controllers.SignUpCtrl)
        },
        {
            method      : ReqMethods.POST,
            url         : '/login',
            middlewares : [],
            fn          : ApiErrorHandler(controllers.LoginCtrl)
        },
        {
            method      : ReqMethods.GET,
            url         : '/users',
            middlewares : [],
            fn          : ApiErrorHandler(controllers.GetUsers)
        },
        {
            method      : ReqMethods.POST,
            url         : '/sendEmail',
            middlewares : [],
            fn          : ApiErrorHandler(controllers.SendEmail)
        },
        {
            method      : ReqMethods.POST,
            url         : '/changePassword',
            middlewares : [],
            fn          : ApiErrorHandler(controllers.changePassword)
        },
        {
            method      : ReqMethods.PUT,
            url         : '/update',
            middlewares : [],
            fn          : ApiErrorHandler(controllers.UpdateUser)
        },
        
    ]

    for (var route of routes) {
        const { method, url, middlewares, fn } = route
        
        router[method](url, ...middlewares, fn)
    }

    return router
}

module.exports = Route()