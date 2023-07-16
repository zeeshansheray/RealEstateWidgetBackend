const { Schema, model } = require('mongoose')
const { UserTypes } = require('../_enums/enums')

const BookingSchema = new Schema({
    tableId       : { type: String, required: true, trim: true },
    duration      : { type: Number, required: true },
    totalDuration : { type: Number, required: true },
    consumation   : { type: Number},
    bottle        : { type: Number},
    lastBookedTime: { type: Number},
    totalBookings : { type: Number, default : 1},
    servedBy      : { type: Object, required: true },
    created       : { type: Number, default: Date.now() },
    modified      : { type: Number, default: Date.now() },
    delete        : { type: Boolean, required: true, default: false },
})

module.exports = model('Bookings', BookingSchema)