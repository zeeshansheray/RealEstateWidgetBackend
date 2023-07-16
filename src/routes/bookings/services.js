const Tables = require('../../model/tables')
const Bookings = require('../../model/bookings')
const { generateToken, verifyPass, generatePassHash } = require('../../_utils/guard')
const { ServiceHandler } = require('../../_utils/handler')
const Responses = require('./responses')
const nodemailer = require('nodemailer');
const env                                                      = require('../../_config/config')



const GetBookingService = async () => {
    
    let bookings = await Bookings.find({ delete: false })

    const sortedBookings = bookings.sort((a, b) => b.modified - a.modified);

    return {
        success : sortedBookings.length > 0 ? true : false,
        message : sortedBookings.length > 0 ? 'Bookings found sucessfully' : 'Cannot found Bookings',
        data    : sortedBookings.length > 0 ? sortedBookings : [],
    }
}

const RemoveBookingService = async (reqData) => {
    try {
        // Get the most recent booking for the given tableId
        let recentBooking = await Bookings.find({ tableId: reqData.tableId })
            .sort({$natural:-1})
            .limit(1);
        
        if (!recentBooking || recentBooking.length === 0) {
            console.log("No booking found for given tableId");
            return {
                success: false,
                message: 'No booking found for given tableId',
            };
        }

        recentBooking = recentBooking[0]; // As we used limit(1), we know there is only one object in the array

        console.log('recentBooking ', recentBooking)
        // Decrement totalBookings by 1

        if (recentBooking.totalBookings > 0) {
            if(recentBooking.lastBookedTime == 20){
                console.log('here1 ')
                    recentBooking.consumation =  recentBooking.consumation - 1
                }
                else if(recentBooking.lastBookedTime == 60){
                console.log('here2 ')
                    recentBooking.bottle =  recentBooking.bottle - 1
            }
            console.log('here ')
                recentBooking.totalBookings -= 1;
        } else {
            console.log("No more bookings to decrement");
            return {
                success: false,
                message: 'No more bookings to decrement',
            };
        }

        // Save the updated booking
        const updatedBooking = await recentBooking.save();

        return {
            success: true,
            message: 'Booking updated successfully',
            data: updatedBooking,
        };
    } catch (err) {
        console.error("Error while updating the booking", err);
        return {
            success: false,
            message: 'Error while updating the booking',
            error: err,
        };
    }
};




module.exports = {
    GetBookingService,
    RemoveBookingService
}