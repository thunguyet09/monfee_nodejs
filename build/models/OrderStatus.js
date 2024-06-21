const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderStatus = new Schema({
  status_id: {
    type: Number
  },
  status_name: {
    type: String
  }
});
module.exports = mongoose.model('OrderStatus', OrderStatus);