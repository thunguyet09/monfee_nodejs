var express = require('express');
const orderDetailController = require('../controllers/orderDetailController');
var router = express.Router();

router.get('/', orderDetailController.getOrderDetails);
router.post('/', orderDetailController.insertOrderDetails)
router.get('/:id', orderDetailController.getOrderDetailsByOrderId)
module.exports = router;
