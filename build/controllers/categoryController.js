const Category = require('../models/Category');
class categoryController {
  async getCategories(req, res) {
    try {
      const categories = await Category.find({});
      if (categories) {
        return res.status(200).json(categories);
      } else {
        return res.status(404).json({
          message: "Not found"
        });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async pagination(req, res) {
    const page = req.params.page;
    const limit = req.params.limit;
    const categoriesQuery = await Category.find({});
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const totalCategories = categoriesQuery.length;
    const totalPages = Math.ceil(totalCategories / limit);
    let categoryData = categoriesQuery.slice(startIndex, endIndex);
    const obj = {
      page: page,
      totalPages: totalPages,
      all_categories: categoriesQuery,
      startIndex: startIndex,
      endIndex: endIndex,
      categoryLength: totalCategories,
      categories: categoryData
    };
    if (obj) {
      res.status(200).json(obj);
    } else {
      res.status(404).json({
        message: 'Categories not found'
      });
    }
  }
  async categoryDetail(req, res) {
    try {
      const id = req.params.id;
      const category = await Category.findOne({
        id: id
      });
      if (category) {
        return res.status(200).json(category);
      } else {
        return res.status(404).json({
          message: 'Not Found'
        });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async updateCategory(req, res) {
    try {
      const id = req.params.id;
      const updated = await Category.updateOne({
        id: id
      }, {
        $set: req.body
      });
      if (updated) {
        return res.status(200).json(updated);
      } else {
        return res.status(404).json({
          message: 'Not Found'
        });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async addCategory(req, res) {
    try {
      const newCategory = new Category(req.body);
      const inserted = await newCategory.save();
      return res.status(200).json(inserted);
    } catch (error) {
      return console.error(error);
    }
  }
  async deleteCategory(req, res) {
    try {
      const id = req.params.id;
      const deleted = await Category.deleteOne({
        id: id
      });
      return res.status(200).json(deleted);
    } catch (error) {
      return console.error(error);
    }
  }
}
module.exports = new categoryController();