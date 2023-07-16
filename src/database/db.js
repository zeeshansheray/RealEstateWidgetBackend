const { connect } = require('mongoose')
const config = require('../_config/config')
const { Pool } = require('pg');

require('dotenv').config();

const connectDb = () => {

    const pool = new Pool({
        host    : process.env.HOST,
        port    : parseInt(process.env.DBPORT),
        database: process.env.DATABASE,
        user    : process.env.USERNAME,
        password: process.env.PASSWORD,
});


// Try to connect
pool.connect()
    .then(client => {
    console.log('Connected to the PostgreSQL database');
    client.release();  // Release the client back to the pool
    })
    .catch(err => {
    console.error('Error connecting to the PostgreSQL database', err);
    process.exit(-1);
});
// 
}

module.exports = connectDb