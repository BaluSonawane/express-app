const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userScema = new Schema({
  f_name:String,
  l_name:String,
  pwd:String
});

var User = mongoose.model('user',userScema);
module.exports = User
