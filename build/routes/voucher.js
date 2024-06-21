var express = require('express');
const voucherController = require('../controllers/voucherController');
var router = express.Router();

/* GET home page. */
router.get('/', voucherController.getAllVouchers);
router.get('/chosed', voucherController.getChosedVoucher);
router.put('/quantity/:id', voucherController.updateQuantityVoucher);
router.get('/:id', voucherController.getDetailVoucher);
module.exports = router;