const Conversation = require("../models/Conversation")
const Message = require("../models/Message")
const User = require("../models/User")

class messageController {
    async insertMesage(req,res){
        try{
            const {conversationId, senderId, message, receiverId = ''} = req.body 
            if(!conversationId){
                const newConversation = new Conversation({
                    members: [senderId, receiverId]
                })
                await newConversation.save()
                const newMessage = new Message({
                    conversationId: newConversation._id,
                    senderId: senderId,
                    message: message
                })

                return res.status(200).send('Message sent successfully!')
            }
            const newMessage = new Message({
                conversationId,
                senderId,
                message
            })
            await newMessage.save()
            return res.status(200).send('Message sent successfully!')
        }catch(err){
            return res.status(500).json(err)
        }
    }

    async getMessagesByConversationId(req,res){
        try{
            const conversationId = req.params.conversationId 
            if(conversationId === 'new'){
                return res.status(200).json([])
            }
            const messages = await Message.find({conversationId: conversationId})
            const messageUserData = Promise.all(messages.map(async(message) => {
                const user = await User.findById(message.senderId)
                return {
                    user: {
                        email: user.email,
                        fullName: user.full_name,
                        active: user.active
                    },

                    message: message.message
                }
            }))

            return res.status(200).json(await messageUserData)
        }catch(err){
            return res.status(500).json(err)
        }
    }
}

module.exports = new messageController