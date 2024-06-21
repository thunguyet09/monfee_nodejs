var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController.js')
//Get all products
router.get('/', productController.getAllProducts)
router.get('/:id', productController.productDetail)
router.get('/category/:categoryId', productController.productByCategoryId)
router.get('/:page/:limit', productController.pagination)
router.put('/wishlist', productController.addToWishlist)
router.get('/pagination', productController.pagination)
router.post('/', productController.addProduct)
router.delete('/:id', productController.deleteProduct)
router.put('/:id', productController.updateProduct)
module.exports = router;