const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cart = new Schema({
  id: {
    type: Number
  },
  prod_id: {
    type: Number
  },
  quantity: {
    type: Number
  },
  user_id: {
    type: String
  },
  size: {
    type: String
  },
  img_url: {
    type: String
  },
  color: {
    type: String
  },
  price: {
    type: Number
  }
});
module.exports = mongoose.model('Cart', Cart);