const OrderDetail = require("../models/OrderDetail");
class orderDetailController {
  async getOrderDetails(req, res) {
    try {
      const order_details = await OrderDetail.find({});
      if (order_details) {
        return res.status(200).json(order_details);
      } else {
        return res.status(404).json({
          message: "Not found"
        });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getOrderDetailsByOrderId(req, res) {
    try {
      const id = req.params.id;
      const order_details = await OrderDetail.find({
        order_id: id
      });
      if (order_details) {
        return res.status(200).json(order_details);
      } else {
        return res.status(404).json({
          message: "Not found"
        });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async insertOrderDetails(req, res) {
    try {
      const {
        order_detail_id,
        order_id,
        prod_id,
        product_name,
        product_price,
        product_quantity,
        size,
        color,
        subtotal
      } = req.body;
      const order_details = new OrderDetail({
        order_detail_id,
        order_id,
        prod_id,
        product_name,
        product_price,
        product_quantity,
        size,
        color,
        subtotal
      });
      const inserted = await order_details.save();
      return res.status(200).json(inserted);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
module.exports = new orderDetailController();