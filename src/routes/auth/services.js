const User = require('../../model/user')
const { generateToken, verifyPass, generatePassHash } = require('../../_utils/guard')
const { ServiceHandler } = require('../../_utils/handler')
const Responses = require('./responses')
const nodemailer = require('nodemailer');
const env                                                      = require('../../_config/config')

const SignUpService = async (user) => {
    const findUser = await  User.findOne({email: user.email});
    if(findUser){
        return {
            success: false,
            message: Responses.SignupResponse.ALREADYEXISTS,
            error  : Responses.SignupResponse.ALREADYEXISTS
        }
    }
    

    const result = await User.create(user)

    if(!result)
    throw {message: Responses.SignupResponse.ERROR}

    const newUser = result.toJSON()

    delete newUser.password
    newUser.token = generateToken({ _id: newUser._id, email: newUser.email }, '1d')

    return {
        success : true,
        message : Responses.SignupResponse.CREATED,
        data    : newUser
    }
}


const GetUsersService = async () => {
    
    let users = await User.find({ delete: false, type : 'user' })

    return {
        success : users.length > 0 ? true : false,
        message : users.length > 0 ? 'Users found sucessfully' : 'Cannot found users',
        data    : users.length > 0 ? users : [],
    }
}


const LoginService = async (reqData) => {
    const result = await User.findOne({email: reqData.email , type : reqData.type })
    if(!result)
    return {
        success : false,
        message : Responses.LoginResponse.USER_NOT_FOUND
    }

    console.log('user ', result);

    const user = result.toJSON()

    if(!verifyPass(reqData.password, user.password))
    return {
        success : false,
        message : Responses.LoginResponse.PASS_MISMATCH
    }

    delete user.password
    user.token = generateToken({ _id: user._id, email: user.email }, '1d')

    return {
        success : true,
        message : Responses.LoginResponse.LOGGEDIN,
        data    : user
    }
}

const SignUpServiceV2 = async (req) => {
    const result = await User.create(req.user)

    if(!result)
    throw {message: Responses.SignupResponse.ERROR}

    const newUser = result.toJSON()

    delete newUser.password
    newUser.token = generateToken({ _id: newUser._id, email: newUser.email }, '1d')

    return {
        success : true,
        message : Responses.SignupResponse.CREATED,
        data    : newUser
    }

}

const SendEmailService = async (reqData) => {
    const result = await User.findOne({email: reqData.email})

    if(!result)
    return {
        success : false,
        message : Responses.LoginResponse.USER_NOT_FOUND
    }

    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: env.gmailEMail,
            pass: env.gmailPassword,
        }
    });
    
    let mailDetails = {
        from   : env.gmailEMail,
        to     : reqData.email,
        subject: reqData.subject || 'Verification Code',
        text   : `Your verification code is: ${reqData.code}`
    };
    
    let error = false;

    await mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            error = true;
            console.log('Error Occurs', err);
        } else {
            console.log('Email sent successfully');
        }
    });

     return {
            success : error ? false : true,
            message : error ? Responses.EmailSend.ERROR : Responses.EmailSend.SUCCESS ,
        }
    



}


const ForgotPasswordService = async (reqData) => {
    console.log('reqData ', reqData)

    const result = await User.findOneAndUpdate({email: reqData.email}, {$set:{password:generatePassHash(reqData.password)}}, {new: true}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
    });


    if(!result)
    return {
        success : false,
        message : Responses.LoginResponse.USER_NOT_FOUND
    }

    else{
        result.password = undefined;
        console.log('result ', result);
        return {
            success : true,
            message : Responses.PasswordChange.SUCCESS ,
            data    : result,
        }
    }

}

const UpdateUserService = async (reqData) => {
    const result = await User.findOneAndUpdate({email: reqData.email}, {$set:{...reqData}}, {new: true}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
    });


    if(!result)
    return {
        success : false,
        message : Responses.Update.ERROR
    }

    else{
        console.log('result ', result);
        return {
            success : true,
            message : Responses.Update.SUCCESS ,
            data    : result,
        }
    }

}

module.exports = {
    SignUpService,
    LoginService,
    SignUpServiceV2 : (req, res) => ServiceHandler(SignUpServiceV2, req, res),
    SendEmailService,
    UpdateUserService,
    ForgotPasswordService,
    GetUsersService
}