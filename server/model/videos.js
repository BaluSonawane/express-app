const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const videoScema = new Schema({
  title:String,
  url:String,
  description:String
});

var Video = mongoose.model('videos',videoScema);
module.exports = Video
