var express = require('express');
const newController = require('../controllers/newController');
var router = express.Router();
router.get('/', newController.getNewsApproved);
module.exports = router;