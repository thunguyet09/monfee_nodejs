const Order = require('../models/Order')
class orderController {
    async getOrders(req,res){
        try{
            const orders = await Order.find({})
            if(orders){
                return res.status(200).json(orders)
            }else{
                return res.status(404).json({message: "Not found"})
            }
        }catch(error){
            return res.status(500).json(err)
        }
    }

    async insertOrder(req,res) {
        let {date, da_tra, discount, note, order_id, payment_method, quantity, status, total, user_id, full_name, email, phone, address, city} = req.body
        let orders = new Order({
            date: date,
            da_tra: da_tra,
            discount: discount,
            note: note,
            order_id: order_id,
            payment_method: payment_method,
            quantity: quantity,
            status: status,
            total: total,
            user_id: user_id,
            full_name: full_name,
            email: email,
            phone: phone,
            address: address,
            city: city
        })

        const insertedOrder = await orders.save()
        if(insertedOrder){
            return res.status(200).json(insertedOrder)
        }else{
            return res.status(404).json({ message: 'Insert failed!' })
        }
    }
}

module.exports = new orderController