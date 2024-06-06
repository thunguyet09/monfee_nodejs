var express = require('express');
const orderController = require('../controllers/orderController');
var router = express.Router();

/* GET home page. */
router.get('/', orderController.getOrders);
router.post('/', orderController.insertOrder)
module.exports = router;
