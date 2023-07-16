const { ResponseStatus, UserTypes }   = require("../../_enums/enums")
const { tablesVld }                     = require("../../_validations")
const { GetBookingService, RemoveBookingService} = require('./services')
const Responses                       = require('./responses')
const { getUniqueId }                 = require("../../_utils/utils")
const { generatePassHash }            = require("../../_utils/guard")
const { ValidationHandler }          = require('../../_utils/handler')


const GetBookings = async (req, res) => {
    const result = await GetBookingService()

    return res.status(ResponseStatus.SUCCESS).send(result)
}

const RemoveBookings = async (req, res) => {
    const { invalid, value } = ValidationHandler(tablesVld.RemoveBooking, req.body, res)

    if(invalid) return invalid()

    const result = await RemoveBookingService(value)

    if(!result.success)
    return res.status(ResponseStatus.BAD_REQUEST).send(result)

    return res.status(ResponseStatus.SUCCESS).send(result)

}



module.exports = {
    GetBookings,
    RemoveBookings
}