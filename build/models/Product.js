const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = new Schema({
  cat_id: {
    type: Number
  },
  id: {
    type: Number
  },
  name: {
    type: String,
    maxLength: 255
  },
  price: {
    type: Array
  },
  gia_nhap: {
    type: Number
  },
  promo_price: {
    type: Array
  },
  quantity: {
    type: Array
  },
  stock: {
    type: String
  },
  mo_ta: {
    type: String,
    maxLength: 600
  },
  img_url: {
    type: Array
  },
  likes: {
    type: Number
  },
  sales: {
    type: Number
  },
  luot_xem: {
    type: Number
  },
  createdAt: {
    type: String
  },
  date_modified: {
    type: String
  },
  colors: {
    type: Array
  },
  sizes: {
    type: Array
  },
  rating: {
    type: Number
  },
  status: {
    type: String
  }
});
module.exports = mongoose.model('Product', Product);