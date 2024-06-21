const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Theme = new Schema({
  id: {
    type: Number
  },
  name: {
    type: String
  },
  text_color: {
    type: String
  },
  bg_color: {
    type: String
  }
});
module.exports = mongoose.model('Theme', Theme);