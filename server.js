const express = require('express')
const compression = require('compression')
const cors = require('cors')
const path = require('path')

const ejs = require('ejs');
const fs = require('fs');

const env = require('./src/_config/config')
const connectDb = require('./src/database/db')
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
// 
app.get('/getData', async(req, res) => {
    const token = req.header('x-auth-token');


    if(!token || !token.includes('Bearer')) // check valid tsoken
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



// Configure your SMTP settings
const transporter = nodemailer.createTransport({
  service: 'smtp.example.com', // Replace with your SMTP service provider
  auth: {
    user: 'do-not-reply@realestateintegrate.com', // Replace with your SMTP username
    pass: '&Wz)8V&?LuC*'  // Replace with your SMTP password
  }
});

// Load and render the EJS template
const emailTemplate = fs.readFileSync('email-template.ejs', 'utf-8');

app.post('/send-email', (req, res) => {
  console.log('req ', req.body)

  const { name, phone, from, email, message, to } = req.body;

  const renderedTemplate = ejs.render(emailTemplate, {
    name: name,
    phone: phone,
    email: email,
    message: message
  });

  // Create the email content
  const mailOptions = {
    from: from, // Replace with your email address
    to: to,
    subject: 'Property Information',
    html : renderedTemplate 
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'An error occurred while sending the email.' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Email sent successfully.' });
    }
  });
});

app.listen(8000, () => {
    console.log('Server is listening at', 8000, 'with env', process.env.NODE_ENV);
})

process.on("unhandledRejection", (err) => {
    console.log("Unhandeled Rejection\n ", err);
});
  
process.on("uncaughtException", (err) => {
    console.log("Uncaught Rejection\n ", err);
});