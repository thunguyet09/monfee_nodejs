const Product = require('../models/Product.js')
const User = require('../models/User.js')
class productController {
    async getAllProducts(req,res){
        try{
            const products = await Product.find({})
            if(products){
                res.status(200).json(products)
            }else{
                res.status(404).json({ message: 'Not Found' })
            }
        }catch(err){
            return res.status(500).json(err)
        }
    }

    async productDetail(req,res){
        try{
            const id = req.params.id
            const product = await Product.findOne({id: id})
            if(product){
                return res.status(200).json(product)
            }else{
                return res.status(404).json({ message: 'Not Found' })
            }
        }catch(err){
            return res.status(500).json(err)
        }
    }

    async productByCategoryId(req,res){
        try{
            const categoryId = req.params.categoryId
            const products = await Product.find({cat_id: categoryId})
            if(products){
                return res.status(200).json(products)
            }else{
                return res.status(404).json({ message: 'Not Found' })
            }
        }catch(err){
            return res.status(500).json(err)
        }
    }

    async pagination(req, res) {
        const page = req.params.page 
        const limit = req.params.limit 
        const productsQuery = await Product.find({})
        const startIndex = (parseInt(page) - 1) * parseInt(limit);
        const endIndex = startIndex + parseInt(limit);
        const totalProducts = productsQuery.length;
        const totalPages = Math.ceil(totalProducts / limit);
        let productData = productsQuery.slice(startIndex, endIndex);

        const obj = {
            page: page,
            totalPages: totalPages,
            all_products: productsQuery,
            startIndex: startIndex,
            endIndex: endIndex,
            productLength: totalProducts,
            products: productData,
        }
        if (obj) {
            res.status(200).json(obj)
        } else {
            res.status(404).json({ message: 'Products not found' })
        }
    }

    async addToWishlist(req, res) {
        try {
          const { prod_id, user_id, favorites } = req.body;
      
          const product = await Product.findOne({ id: prod_id });
          const user = await User.findOne({ _id: user_id });
      
          if (product && user) {
            product.likes = product.likes + 1;
            user.products_fav = favorites;
            
            const updatedProduct = await product.save();
            const updatedUser = await user.save();
      
            return res.status(200).json(updatedUser);
          } else {
            return res.status(404).json({ message: "Not found" });
          }
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
    }

    async addProduct(req,res){
        try {
            const newProduct = new Product(req.body);
            const inserted = await newProduct.save();

            return res.status(200).json(inserted);
        } catch (error) {
            return console.error(error);
        }
    }

    async deleteProduct(req,res){
        try {
            const id = req.params.id
            const deleted = await Product.deleteOne({id: id})
        
            return res.status(200).json(deleted);
        } catch (error) {
            return console.error(error);
        }
    }

    async updateProduct(req,res){
        try{
            const id = req.params.id
            const updated = await Product.updateOne({id: id}, {$set: req.body})
            if (updated) {
                return res.status(200).json(updated)
            } else {
                return res.status(404).json({ message: 'Not Found' })
            }
        }catch(err){
            return res.status(500).json(err)
        }
    }
}

module.exports = new productController