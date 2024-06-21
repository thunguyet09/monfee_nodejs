var express = require('express');
const themeController = require('../controllers/themeController');
var router = express.Router();

/* GET home page. */
router.get('/', themeController.getTheme)

module.exports = router;
