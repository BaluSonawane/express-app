const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const googleschema = new Schema({
  origin: String,
  desti: String,
  distance: String,
  per_km: String,
  to_amount: String
});

var googlemap = mongoose.model('googlemap', googleschema);
module.exports = googlemap
