var express = require('express');
const categoryController = require('../controllers/categoryController');
var router = express.Router();

router.get('/', categoryController.getCategories)
router.get('/pagination/:page/:limit', categoryController.pagination)
router.get('/:id', categoryController.categoryDetail)
router.put('/:id', categoryController.updateCategory)
router.post('/', categoryController.addCategory)
router.delete('/:id', categoryController.deleteCategory)
module.exports = router;
