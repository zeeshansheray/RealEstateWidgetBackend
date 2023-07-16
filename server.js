const express = require('express');
const compression = require('compression');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const env = require('./src/_config/config');
const connectDb = require('./src/database/db');
const endpoints = require('./src/routes');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(cors());

// Connect to Database
connectDb();


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());

app.use(compression());
app.use(express.static(path.join(__dirname, 'build')));
app.set('view engine', 'ejs');

const server = http.createServer(app);

server.listen(env.port, () => {
  console.log('Server is listening at', env.port, 'with env', process.env.NODE_ENV);
});



endpoints(app);


process.on('unhandledRejection', (err) => {
});

process.on('uncaughtException', (err) => {
  // console.log('Uncaught Rejection\n ', err);
});
