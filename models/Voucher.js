const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Voucher = new Schema({
    id: { type: Number },
    voucher_code: {type: String},
    expiredDate: {type: String},
    discount: {type: Number},
    choose: {type: Number},
    quantity: {type: Number}
})

module.exports = mongoose.model('Voucher', Voucher)