const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = new Schema({
    debt: {type: Number},
    full_name: {type: String},
    email: {type: String},
    role: {type: String},
    password: {type: String},
    createdDate: {type: String},
    products_fav: {type: Array}, 
    vouchers: {type: Array},
    total: {type: Number},
    phone: {type: Number},
    address: {type: String},
    gender: {type: String},
    avatar: {type: String},
    birthday: {type: Date},
    otp: {type: Number},
    otpExpired: {type: Date},
    order_info: {type: Object},
    city: {type: String},
    emailed: {type: Boolean},
    token: {type: String}
})

module.exports = mongoose.model('User', User)