var express = require('express');
const conversationController = require('../controllers/conversationController');
var router = express.Router();

/* GET home page. */
router.post('/', conversationController.createdConversation);
module.exports = router;
