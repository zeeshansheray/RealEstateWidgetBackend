const express = require('express')
const compression = require('compression')
const cors = require('cors')

const ejs = require('ejs');
const fs = require('fs');
const Mailjet = require('node-mailjet')

const connectDb = require('./src/database/db')
const bodyParser = require('body-parser');
const { ResponseMessages, ResponseStatus } = require('./src/_enums')

const app = express()
app.use(cors());
  
connectDb()

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json())

app.use(compression())
app.set('view engine', 'ejs')

app.get('/getData', async(req, res) => {
    const token = req.header('x-auth-token');


    if(!token || !token.includes('Bearer')) // check valid token
    return res.status(ResponseStatus.UNAUTHORIZED).send({ error: ResponseMessages.AUTH_ERROR, status: ResponseStatus.UNAUTHORIZED })

    if(token !== ('Bearer ' + 'andrew4a923a7dcef14a7d' +'&'+process.env.PASSWORD))
    return res.status(ResponseStatus.UNAUTHORIZED).send({ error: ResponseMessages.AUTH_ERROR, status: ResponseStatus.UNAUTHORIZED })

    try {
      const query = `SELECT * FROM ${req.query.ref}`;
  
      const results = await global.pool.query(query);

      const data = results.rows;
  
      res.status(ResponseStatus.SUCCESS).send({ 
        success: data.length > 0,
        message: data.length > 0 ? 'Users found successfully' : 'Cannot find users',
        data: data.length > 0 ? data : [],
       })
    
    } catch (error) {
      res.status(ResponseStatus.INTERNAL_ERROR).send({ 
        success: data.length > 0,
        message: data.length > 0 ? 'Users found successfully' : 'Cannot find users',
        data: data.length > 0 ? data : [],
       })
      throw new Error('Unable to find data'); // Throw an error to be caught by the caller.
    }

});

const emailTemplate = fs.readFileSync('email-template.ejs', 'utf-8');

const mailjet = new Mailjet({apiKey : '4bdf65f4c227871115dd79bc64bee7ab', apiSecret : '866183b28a994b9380c3d0e11dc23350'});

app.post('/send-email', async(req, res) => {
  console.log('req ', req.body)

  const { name, phone, email, message, to } = req.body;

  const renderedTemplate = ejs.render(emailTemplate, {
    name: name,
    phone: phone,
    email: email,
    message: message
  });

  // Create the email content
  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'no-reply@realestateintegrate.com',
          Name: name,
        },
        To: [
          {
            Email: to,
            Name: to
          }
        ],
        Subject: 'Property Information',
        HTMLPart: renderedTemplate
      }
    ]


  });

  try {
    const result = await request;
    console.log('Email sent successfully:', result.body);
    res.status(ResponseStatus.SUCCESS).send({ 
      success: true,
      message: 'Email Sent sucessfully',
     })

  } catch (err) {
    console.error('Error sending email:', err);
    res.status(ResponseStatus.INTERNAL_ERROR).send({ 
      success: false,
      message: 'Failed to send email',
     })
  }
})  

app.listen(8080, () => {
    console.log('Server is listening at', 8080, 'with env', process.env.NODE_ENV);
})

process.on("unhandledRejection", (err) => {
    console.log("Unhandeled Rejection\n ", err);
});
  
process.on("uncaughtException", (err) => {
    console.log("Uncaught Rejection\n ", err);
});