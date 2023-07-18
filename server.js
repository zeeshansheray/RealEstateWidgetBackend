const express = require('express')
const compression = require('compression')
const cors = require('cors')
const path = require('path')

const env = require('./src/_config/config')
const connectDb = require('./src/database/db')
const endpoints = require('./src/routes')
const bodyParser = require('body-parser');
const { ResponseMessages, ResponseStatus } = require('./src/_enums')

const app = express()
app.use(cors());

// Connect to Database
connectDb()

// app.use(express.urlencoded({extended: false, limit: '50mb'}))

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json())

app.use(compression())
// app.use(express.static(path.join(__dirname, 'build')))
app.set('view engine', 'ejs')

app.get('/getData', async(req, res) => {
    console.log('here')
    const token = req.header('x-auth-token');

    if(!token || !token.includes('Bearer')) // check valid token
    return res.status(ResponseStatus.UNAUTHORIZED).send({ error: ResponseMessages.AUTH_ERROR, status: ResponseStatus.UNAUTHORIZED })

    if(token !== ('Bearer ' + process.env.USERNAME +'&'+process.env.PASSWORD))
    return res.status(ResponseStatus.UNAUTHORIZED).send({ error: ResponseMessages.AUTH_ERROR, status: ResponseStatus.UNAUTHORIZED })

    try {
      const query = `SELECT * FROM ${req.query.ref} LIMIT 50`;
  
      const results = await global.pool.query(query);
      const data = results.rows;
  
      console.log('data ', data.length)
      res.status(ResponseStatus.SUCCESS).send({ 
        success: data.length > 0,
        message: data.length > 0 ? 'Users found successfully' : 'Cannot find users',
        data: data.length > 0 ? data : [],

       })
    
    } catch (error) {
      throw new Error('Unable to find data'); // Throw an error to be caught by the caller.
    }

  });


app.listen(env.port, () => {
    console.log('Server is listening at', env.port, 'with env', process.env.NODE_ENV);
})

endpoints(app)

process.on("unhandledRejection", (err) => {
    console.log("Unhandeled Rejection\n ", err);
});
  
process.on("uncaughtException", (err) => {
    console.log("Uncaught Rejection\n ", err);
});