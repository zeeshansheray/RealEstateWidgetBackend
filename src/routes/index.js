const middleware = process.env.NODE_ENV === 'production' ? '/v1/' : '/api/v1/'

console.log('process.env.NODE_ENV  ', process.env.NODE_ENV )

const initializeEndpoints = (app) => {
};

module.exports = initializeEndpoints;
