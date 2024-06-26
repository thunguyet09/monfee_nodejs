var express = require('express');
const conversationController = require('../controllers/conversationController');
var router = express.Router();

router.post('/', conversationController.createdConversation);
router.get('/:id', conversationController.getMyConversation)
router.get('/:senderId/:receiverId', conversationController.getConversation)
router.delete('/:id', conversationController.deleteConversation)
module.exports = router;
