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
            method      : ReqMethods.GET,
            url         : '/',
            middlewares : [],
            fn          : ApiErrorHandler(controllers.GetBookings)
        },
        {
            method      : ReqMethods.PUT,
            url         : '/',
            middlewares : [],
            fn          : ApiErrorHandler(controllers.RemoveBookings)
        },
    ]

    for (var route of routes) {
        const { method, url, middlewares, fn } = route
        
        router[method](url, ...middlewares, fn)
    }

    return router
}

module.exports = Route()