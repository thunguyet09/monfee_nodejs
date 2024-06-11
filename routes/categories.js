var express = require('express');
const categoryController = require('../controllers/categoryController');
var router = express.Router();
const verifyToken = require('./verifyToken')
router.get('/', verifyToken, categoryController.getCategories)
router.get('/pagination/:page/:limit', verifyToken, categoryController.pagination)
router.get('/:id', categoryController.categoryDetail)
router.put('/:id', categoryController.updateCategory)
router.post('/', categoryController.addCategory)
router.delete('/:id', categoryController.deleteCategory)
module.exports = router;
