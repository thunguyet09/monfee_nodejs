var express = require('express');
const userController = require('../controllers/userController');
var router = express.Router();

/* GET users listing. */
router.post('/register', userController.handleRegister)
router.get('/register', userController.getUsers)
router.post('/login', userController.handleLogin)
router.post('/verifyToken', userController.verifyToken)
router.get('/:id', userController.getUser)
router.post('/verifyUserToken', userController.verifyUserToken)
router.put('/vouchers/:id', userController.addVouchers)
router.put('/order-info/:id', userController.updateOrderInfo)
router.put('/emailed/:id', userController.updateNotice)
router.post('/reset-password', userController.sendResetPasswordLink)
router.get('/token/:token', userController.getUserByToken)
router.post('/compare-password', userController.comparePassword)
router.post('/new-password/:id', userController.resetPassword)
router.delete('/remove-token/:id', userController.removeToken)
router.post('/refresh-token', userController.refreshToken)
module.exports = router;
