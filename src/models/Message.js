const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Message = new Schema({
    conversationId: {type: String}, 
    senderId: {type: String}, 
    message: {type: String}
})

module.exports = mongoose.model('Message', Message)