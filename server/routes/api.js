const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../model/videos');
const User = require('../model/user');
// var mongoDB = 'mongodb://balums:k022098@ds159676.mlab.com:59676/myfirstmdb';
var mongoDB = 'mongodb://Balu:Balu2200@myfirst-shard-00-00-x5ymg.mongodb.net:27017/videos?ssl=true&replicaSet=myfirst-shard-0&authSource=admin'

var MongoClient = require('mongodb').MongoClient;

// var uri = "mongodb://Balu:Balu2200@myfirst-shard-00-00-x5ymg.mongodb.net:27017/videos?ssl=true&replicaSet=myfirst-shard-0&authSource=admin";
MongoClient.connect(mongoDB, function(err, db) {
    if(err) {
      console.log(err);
    }else {
         console.log("success");
    }
});

mongoose.connect(mongoDB,{
  useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

router.get('/videos',function(req,res){

  console.log('Get request for video');
// db.collection("video").rename("videos", function(err, newc){
//   if (err) {
//     console.log(err);
//   }else {
//     console.log("success");
//   }
// })
  Video.find({},function(err,video){
    if(err){
      console.log("Error ");
    }else {

      res.send(video);
    }
  })
  // User.find({}, function(err, user){
  //   if (err) {
  //     console.log(err);
  //   }else{
  //     res.json(user)
  //   }
  // })
  // db.collection("video").find({},{_id:false}).toArray(function(err,video){
  //   if (err) {
  //     console.log(err);
  //   }else {
  //     res.json(video)
  //   }
  // })
});



router.post('/login',function(req, res){
  var fname = req.body.fname;
  var lname = req.body.lname;
  if (fname === "") {

      res.send(fname+' '+lname)
  } else {
  console.log('er');
  res.send('er')
  }
})

router.get("/",function(req,res){
  res.send("Hey There!");
})

module.exports = router;
