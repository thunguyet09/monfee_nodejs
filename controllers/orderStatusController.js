const OrderStatus = require("../models/OrderStatus")

class orderStatusController {
    async getOrderStatus(req,res){
        try{
            const order_status = await OrderStatus.find({})
            if(order_status){
                return res.status(200).json(order_status)
            }else{
                return res.status(404).json({message: "Not found"})
            }
        }catch(error){
            return res.status(500).json(err)
        }
    }
}

module.exports = new orderStatusController