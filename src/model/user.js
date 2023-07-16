const { Schema, model } = require('mongoose')
const { UserTypes } = require('../_enums/enums')

const UserSchema = new Schema({
    name    : { type: String, required: true, trim: true },
    email   : { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    created : { type: Number, default: Date.now() },
    modified: { type: Number, default: Date.now() },
    type    : { type: String},
    delete  : { type: Boolean, required: true, default: false },

})

module.exports = model('User', UserSchema)