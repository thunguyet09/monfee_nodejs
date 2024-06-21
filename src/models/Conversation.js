const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Conversation = new Schema({
    members: {type: Array}
})

module.exports = mongoose.model('Conversation', Conversation)