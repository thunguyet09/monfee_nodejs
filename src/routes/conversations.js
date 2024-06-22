var express = require('express');
const conversationController = require('../controllers/conversationController');
var router = express.Router();

/* GET home page. */
router.post('/', conversationController.createdConversation);
router.get('/:id', conversationController.getMyConversation)
router.get('/:senderId/:receiverId', conversationController.getConversation)
module.exports = router;
