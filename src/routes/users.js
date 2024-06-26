var express = require('express');
const userController = require('../controllers/userController');
var router = express.Router();
var app = express();
const multer = require('multer');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

function checkFileUpLoad(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|avif|webp)$/)) {
        return cb(new Error('Bạn chỉ được upload file ảnh'));
    }
    cb(null, true);
}

let upload = multer({ storage: storage, fileFilter: checkFileUpLoad });

app.use(express.static('public'))

router.post('/register', userController.handleRegister)
router.get('/register', userController.getUsers)
router.post('/login', userController.handleLogin)
router.post('/verifyToken', userController.verifyToken)
router.get('/position/consultant', userController.getConsultant)
router.get('/:id', userController.getUser)
router.post('/verifyUserToken', userController.verifyUserToken)
router.put('/:id', userController.updateAccountInfo)
router.post('/uploadImg', upload.single('avatar'), userController.uploadImg)
router.put('/vouchers/:id', userController.addVouchers)
router.put('/order-info/:id', userController.updateOrderInfo)
router.put('/emailed/:id', userController.updateNotice)
router.post('/reset-password', userController.sendResetPasswordLink)
router.get('/token/:token', userController.getUserByToken)
router.post('/compare-password', userController.comparePassword)
router.post('/new-password/:id', userController.resetPassword)
router.delete('/remove-token/:id', userController.removeToken)
router.post('/refresh-token', userController.refreshToken)
router.put('/notifications/:id', userController.insertNotifications)
router.post('/tokenExpired', userController.isTokenExpired)
router.post('/spending', userController.userSpending)
router.get('/logout/:id', userController.handleLogout)
router.post('/search', userController.handleUserSearch)
module.exports = router;
