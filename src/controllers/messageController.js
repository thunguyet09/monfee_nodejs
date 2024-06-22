const Conversation = require("../models/Conversation")
const Message = require("../models/Message")
const User = require("../models/User")

class messageController {
    async insertMesage(req,res){
        try{
            const {conversationId, senderId, message, receiverId, date} = req.body 
            if(!conversationId){
                const newConversation = new Conversation({
                    members: [senderId, receiverId],
                    date: date
                })
                await newConversation.save()
                const newMessage = new Message({
                    conversationId: newConversation._id,
                    senderId: senderId,
                    message: message,
                    date: date
                })
                await newMessage.save()
                return res.status(200).send('Message sent successfully!')
            }
            const newMessage = new Message({
                conversationId,
                senderId,
                message,
                date
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
                        id: user._id,
                        email: user.email,
                        fullName: user.full_name,
                        active: user.active,
                        position: user.position == 'Consultant' ? user.position : '',
                        role: user.role,
                        avatar: user.avatar
                    },

                    message: message.message,
                    date: message.date
                }
            }))

            return res.status(200).json(await messageUserData)
        }catch(err){
            return res.status(500).json(err)
        }
    }

    async automatedMessage(req, res) {
        try {
          const { message, receiverId, senderId, date, dateWithHours } = req.body;
      
          const conversation = await Conversation.findOne({ members: { $all: [senderId, receiverId] } });
      
          if (conversation) {
            return res.status(200).json(false);
          } else {
            const newConversation = new Conversation({
              members: [senderId, receiverId],
              date: date
            });
            await newConversation.save();
      
            const newMessage = new Message({
              conversationId: newConversation._id,
              senderId: senderId,
              message: message,
              date: dateWithHours
            });
            await newMessage.save();
      
            return res.status(200).json(true)
          }
        } catch (error) {
          return res.status(500).json(error);
        }
    }
}

module.exports = new messageController