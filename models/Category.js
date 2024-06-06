const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Category = new Schema({
    id: {type: Number},
    name: {type: String},
    date_added: {type:String},
    date_modified: {type: String},
    top: {type: String},
    status: {type: String},
    image: {type: String}
})

module.exports = mongoose.model('Category', Category)