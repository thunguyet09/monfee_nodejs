var express = require('express');
const orderStatusController = require('../controllers/orderStatusController');
var router = express.Router();

/* GET home page. */
router.get('/', orderStatusController.getOrderStatus);

module.exports = router;
