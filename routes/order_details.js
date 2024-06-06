var express = require('express');
const orderDetailController = require('../controllers/orderDetailController');
var router = express.Router();

/* GET home page. */
router.get('/', orderDetailController.getOrderDetails);
router.post('/', orderDetailController.insertOrderDetails)
module.exports = router;
