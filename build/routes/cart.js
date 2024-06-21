var express = require('express');
const cartController = require('../controllers/cartController');
var router = express.Router();
const jwt = require('jsonwebtoken');
function authenticate(req, res, next) {
  try {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(' ')[1];
      jwt.verify(bearerToken, 'nguyet', (err, authData) => {
        if (err) {
          res.status(403).json(err);
        } else {
          req.authData = authData;
          next();
        }
      });
    } else {
      res.status(403).json({
        message: 'Không có quyền truy cập'
      });
    }
  } catch (err) {
    return res.status(401).json({
      message: 'Unauthenticated'
    });
  }
}
router.get('/', cartController.getCarts);
router.post('/', cartController.insertCart);
router.put('/', cartController.updateCart);
router.delete('/:id', cartController.removeCart);
router.put('/quantity', cartController.updateQuantity);
module.exports = router;