const Cart = require("../models/Cart")

class cartController {
    async getCarts(req,res){
        try{
            const carts = await Cart.find({})
            if(carts){
                return res.status(200).json(carts)
            }else{
                return res.status(404).json({message: "Not found"})
            }
        }catch(err){
            return res.status(500).json(err)
        }
    }

    async insertCart(req,res){
        try {
            const { id, prod_id, quantity, user_id, size, color, img_url } = req.body;

            const newCart = new Cart({
                id,
                prod_id,
                quantity,
                user_id,
                size,
                color,
                img_url
            });

            const insertedCart = await newCart.save();

            return res.status(200).json(insertedCart);
        } catch (error) {
            return res.status(500).json(err)
        }
    }

    async updateCart(req,res){
        try {
            const {quantity, prod_id, user_id, color, size} = req.body
            const cart = await Cart.findOne({prod_id: prod_id, user_id: user_id, color: color, size: size})
            
            if(cart){
                cart.quantity = quantity
                const updated = await cart.save()
                return res.status(200).json(updated)
            }else{
                return res.status(404).json({message: "Not found"})
            }
        }catch (error) {
            return res.status(500).json(err)
        }
    }

    async removeCart(req,res){
        try {
            const cartId = req.params.id
            const cart = await Cart.deleteOne({id: cartId})
            if(cart) {
                res.status(200).json(cart)
            }else{
                res.status(404).json({ message: 'Not Found' })
            }
        }catch (error) {
          return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateQuantity(req,res){
        try{
            const {id, quantity, price } = req.body
            const cart = await Cart.findOne({id: id})
            if(cart){
                cart.quantity = quantity
                cart.price = price
                const updated = await cart.save()
                return res.status(200).json(updated)
            }else{
                return res.status(404).json({ message: 'Not Found' })
            }
        }catch(error){
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new cartController