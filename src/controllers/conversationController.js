const Conversation = require("../models/Conversation")

class conversationController {
    async createdConversation(req,res){
        try{
            const {senderId, receiverId} = req.body 
            const newConversation = new Conversation({
                members: [senderId, receiverId]
            })
            await newConversation.save()
            return res.status(200).json('Conversation created successfully!')
        }catch(error){
            return res.status(500).json(error)
        }
    }
}

module.exports = new conversationController