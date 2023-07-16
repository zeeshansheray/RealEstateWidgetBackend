const middleware = process.env.NODE_ENV === 'production' ? '/v1/' : '/api/v1/'
const Auth      = require("./auth/routes")
const Tables      = require("./tables/routes")
const Bookings      = require("./bookings/routes")




const initializeEndpoints = (app) => {
    app.use(middleware + 'auth', Auth)
    app.use(middleware + 'tables', Tables)
    app.use(middleware + 'bookings', Bookings)
};

module.exports = initializeEndpoints;
