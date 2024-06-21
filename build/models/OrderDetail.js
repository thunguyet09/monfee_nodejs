const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderDetail = new Schema({
  order_detail_id: {
    type: Number
  },
  order_id: {
    type: Number
  },
  prod_id: {
    type: Number
  },
  product_name: {
    type: String
  },
  img_url: {
    type: String
  },
  product_price: {
    type: Number
  },
  product_quantity: {
    type: Number
  },
  size: {
    type: String
  },
  color: {
    type: String
  },
  subtotal: {
    type: Number
  }
});
module.exports = mongoose.model('OrderDetail', OrderDetail);