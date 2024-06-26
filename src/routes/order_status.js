var express = require('express');
const orderStatusController = require('../controllers/orderStatusController');
var router = express.Router();

router.get('/', orderStatusController.getOrderStatus);
router.get('/:id', orderStatusController.getOrderStatusById)
module.exports = router;
