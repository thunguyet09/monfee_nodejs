var express = require('express');
const orderController = require('../controllers/orderController');
var router = express.Router();

/* GET home page. */
router.get('/:userId/:page/:limit', orderController.getOrdersOfUser);
router.get('/', orderController.getAllOrders)
router.post('/', orderController.insertOrder)
module.exports = router;
