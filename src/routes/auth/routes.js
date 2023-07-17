const express = require('express')
const router = express.Router()

const { ReqMethods } = require('../../_enums/enums')

const controllers = require('./controllers')

const { ApiErrorHandler } = require('../../_utils/handler')
// const { Authenticate } = require('../../lib/auth/auth.services')

console.log('routes ')

const Route = () => {
    const routes = [
        {
            method      : ReqMethods.GET,
            url         : '/',
            middlewares : [],
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