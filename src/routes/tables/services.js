const Tables = require('../../model/tables')
const Bookings = require('../../model/bookings')
const { generateToken, verifyPass, generatePassHash } = require('../../_utils/guard')
const { ServiceHandler } = require('../../_utils/handler')
const Responses = require('./responses')
const nodemailer = require('nodemailer');
const env                                                      = require('../../_config/config')


const CreateService = async (table) => {
    const result = await Tables.create(table)

    if(!result)
    throw {message: Responses.SignupResponse.ERROR}

    const newTable = result.toJSON()

    return {
        success : true,
        message : Responses.CreateResponse.CREATED,
        data    : newTable
    }
}


const GetTablesService = async () => {
    
    let tables = await Tables.find({ delete: false })

    return {
        success : tables.length > 0 ? true : false,
        message : tables.length > 0 ? 'Tables found sucessfully' : 'Cannot found tables',
        data    : tables.length > 0 ? tables : [],
    }
}



const UpdateTableService = async (reqData, socket) => {
    let currentBooking;
    console.log('socket ', socket)

    console.log('reqData ', reqData)

    if (((reqData.lastBookingId === "") || (!reqData.lastBookingId)) && (reqData.reset == undefined || reqData.reset == null) && !reqData.isExtra) {
        let data = {
            tableId        : reqData._id,
            duration       : reqData.duration,
            servedBy       : reqData.servedBy,
            totalDuration  : reqData.totalDuration,
            lastBookedTime : reqData.totalDuration,
            finishBookingAt: reqData.finishBookingAt,
        };

        if(reqData.totalDuration == 20){
            data.consumation = 1
        }
        else{
            data.bottle = 1
        }

        if (reqData.totalBookings) {
            data.totalBookings = reqData.totalBookings;
        }


        console.log('data ', data)
        currentBooking = await Bookings.create(data);
    } else if ((reqData.lastBookingId !== "") && (!reqData.reset || reqData.reset == null) && !reqData.isExtra) {
        let findBooking = await Bookings.find({ _id: reqData.lastBookingId });

        let consumation = (findBooking && findBooking[0] && findBooking[0].consumation) ?  findBooking[0].consumation : 0
        let bottle = (findBooking && findBooking[0] && findBooking[0].bottle) ?  findBooking[0].bottle : 0 
        if(reqData.totalDuration == 20){
            consumation += 1
        }
        if(reqData.totalDuration == 60){
            bottle += 1
        }
        
        if(findBooking[0]?._id){
            currentBooking = await Bookings.findOneAndUpdate(
                { _id: findBooking[0]._id },
                { $set: { totalBookings: findBooking[0].totalBookings + 1, lastBookedTime : reqData.totalDuration, consumation : consumation, bottle: bottle,  modified: new Date().getTime() } },
                { new: true },
                (err, doc) => {
                    if (err) {
                        console.log("Something wrong when updating data!", err);
                    }
                }
            );
        }
    }

    const result = await Tables.findOneAndUpdate(
        { _id: reqData._id },
        { $set: { ...(reqData || {}), lastBookingId: currentBooking ? currentBooking._id || "" : "" } },
        { new: true },
        (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!", err);
            }
        }
    );

    // console.log('result ', result);

    if (!result) {
        return {
            success: false,
            message: Responses.Update.ERROR
        };
    } else {
        socket.broadcast.emit('updateTable', reqData);
        return {
            success: true,
            message: Responses.Update.SUCCESS,
            data: result
        };
    }
};




const ResetTableService = async (reqData, socket) => {
    const result = await Tables.findOneAndUpdate({_id: reqData._id}, {$set:{...reqData}}, {new: true}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!", err);
        }
    });


    if(!result)
    return {
        success : false,
        message : Responses.Update.ERROR
    }

    else{
        // socket.broadcast.emit('resetTable', reqData);
        return {
            success : true,
            message : Responses.Update.SUCCESS ,
            data    : result,
        }
    }

}

module.exports = {
    CreateService,
    UpdateTableService,
    GetTablesService,
    ResetTableService
}