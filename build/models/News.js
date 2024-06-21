const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const News = new Schema({
  id: {
    type: Number
  },
  title: {
    type: String
  },
  createdAt: {
    type: Date
  },
  heading: {
    type: String
  },
  content: {
    type: String
  },
  author: {
    type: String
  },
  img_url: {
    type: String
  },
  block_quote: {
    type: String
  }
});
module.exports = mongoose.model('News', News);