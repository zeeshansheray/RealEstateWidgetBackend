const { Schema, model } = require('mongoose')
const { UserTypes } = require('../_enums/enums')

const TableSchema = new Schema({
    servedBy       : { type: Object, allow : ''},
    name           : { type: String, required : true},
    lastBookingId  : { type: String, allow : ''},
    duration       : { type: Number, allow : '' },
    currentTime    : { type: Number, allow : '' },
    bookedFor      : { type: Number, allow : '' },
    remainingTime  : { type: Number, allow : '' },
    extra          : { type: Number, default : 0},
    finishBookingAt: { type: Number, default : 0},
    created        : { type: Number, default: Date.now() },
    modified       : { type: Number, default: Date.now() },
    delete         : { type: Boolean, required: true, default: false },
})

module.exports = model('Tables', TableSchema)
