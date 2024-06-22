const Conversation = require("../models/Conversation")

class conversationController {
    async createdConversation(req, res) {
        try {
            const { senderId, receiverId } = req.body
            const newConversation = new Conversation({
                members: [senderId, receiverId]
            })
            await newConversation.save()
            return res.status(200).json('Conversation created successfully!')
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async getMyConversation(req, res) {
        try {
            const id = req.params.id;
            const conversation = await Conversation.find({
                members: {
                    $in: [id]
                }
            });

            if (conversation.length > 0) {
                return res.status(200).json(conversation);
            } else {
                return res.status(404).json({ message: 'Not found' });
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async getConversation(req,res){
        try {
            const senderId = req.params.senderId
            const receiverId = req.params.receiverId
            const conversation = await Conversation.findOne({members: { $all: [senderId, receiverId] }})
            if(conversation){
                return res.status(200).json(conversation)
            }else{
                return res.status(404).json({message: 'Conversation not found'})
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = new conversationController