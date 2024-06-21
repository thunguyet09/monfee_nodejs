const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Order = new Schema({
  date: {
    type: String
  },
  da_tra: {
    type: Number
  },
  discount: {
    type: Number
  },
  note: {
    type: String
  },
  order_id: {
    type: Number
  },
  payment_method: {
    type: String
  },
  quantity: {
    type: Number
  },
  status: {
    type: Number
  },
  total: {
    type: Number
  },
  user_id: {
    type: String
  },
  full_name: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  city: {
    type: String
  }
});
module.exports = mongoose.model('Order', Order);