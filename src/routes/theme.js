var express = require('express');
const themeController = require('../controllers/themeController');
var router = express.Router();

router.get('/', themeController.getTheme)
router.put('/chat', themeController.updateStatus)
router.get('/chat', themeController.getChatTheme)
module.exports = router;
