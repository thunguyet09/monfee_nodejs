var express = require('express');
const messageController = require('../controllers/messageController');
var router = express.Router();

/* GET home page. */
router.get('/:conversationId', messageController.getMessagesByConversationId);
router.post('/', messageController.insertMesage)
module.exports = router;
