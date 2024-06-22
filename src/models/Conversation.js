const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Conversation = new Schema({
    members: {type: Array},
    date: {type: String}
})

module.exports = mongoose.model('Conversation', Conversation)