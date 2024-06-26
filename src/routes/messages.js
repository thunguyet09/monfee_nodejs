var express = require('express');
const messageController = require('../controllers/messageController');
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

/* GET home page. */
router.get('/:conversationId', messageController.getMessagesByConversationId);
router.post('/', messageController.insertMesage)
router.post('/automated', messageController.automatedMessage)
router.post('/uploadImg', upload.single('img'), messageController.uploadImg)
router.delete('/:conversationId', messageController.deleteMessage)
module.exports = router;
