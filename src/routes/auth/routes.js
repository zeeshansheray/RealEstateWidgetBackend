const express = require('express')
const router = express.Router()

const { ReqMethods } = require('../../_enums/enums')

const controllers = require('./controllers')

const { ApiErrorHandler } = require('../../_utils/handler')
const { Authenticate } = require('../../lib/auth/auth.services')


const Route = () => {
    const routes = [
        {
            method      : ReqMethods.GET,
            url         : '/',
            middlewares : [Authenticate],
            fn          : ApiErrorHandler(controllers.GetData)
        },
    ]

    for (var route of routes) {
        const { method, url, middlewares, fn } = route
        
        router[method](url, ...middlewares, fn)
    }

    return router
}

module.exports = Route()