var express = require('express');
const orderController = require('../controllers/orderController');
var router = express.Router();

/* GET home page. */
router.get('/:userId/:page/:limit', orderController.getOrdersOfUser);
router.get('/', orderController.getAllOrders);
router.post('/', orderController.insertOrder);
router.put('/status/:orderId', orderController.changeOrderStatus);
router.get('/ascending/:userId/:page/:limit', orderController.ascendingOrdersByTotal);
router.get('/descending/:userId/:page/:limit', orderController.descendingOrdersByTotal);
router.post('/trigger-email', orderController.triggerEmail);
module.exports = router;