const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const validator = require('express-validator');
const api = require('./server/routes/api');
const { celebrate, Joi, errors } = require('celebrate');
const Gmap = require('./server/model/googlemap');

// var mongoDB = 'mongodb://balums:k022098@ds159676.mlab.com:59676/myfirstmdb';
var mongoDB = 'mongodb://Balu:Balu2200@myfirst-shard-00-00-x5ymg.mongodb.net:27017/sample?ssl=true&replicaSet=myfirst-shard-0&authSource=admin';


const port = 3000;

const app = express();

var MongoClient = require('mongodb').MongoClient;
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

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api',api);
app.use(validator());



app.get('/', function(req, res){
  res.send("Hello hi");
});

// app.use(celebrate({
//  headers: Joi.object({
//    token: Joi.string().required(),
//    secret: Joi.string().required()
//  }).unknown()
// }));
app.post('/ce',celebrate({
  body: Joi.object().keys({
    fname: Joi.string().required()
  }),
  headers: Joi.object({
    token: Joi.string().required(),
    secret: Joi.string().required()
  }).unknown()
}), (req, res) =>{
   var name = req.body.fname
   var sec = req.headers.secret

   if (sec === 'secretis') {
     res.send('your in secret')
   }else {
     res.send('Hi '+name)
   }

})
app.use(errors());

const valid = celebrate({
  body: Joi.object().keys({
    fname: Joi.string().required()
  }),
  headers: Joi.object({
    token: Joi.string().required()
  }).unknown()
})

const valides = celebrate({
  body: Joi.object({
    origin: Joi.string().required(),
    desti: Joi.string().required(),
    distance: Joi.string().required(),
    per_km: Joi.string().required(),
    to_amount: Joi.string().required()
  })
})

app.post('/googlemap',valides, function(req, res){
  console.log('Get request for googlemap');

  var origin = req.body.origin;
  var desti = req.body.desti;
  var distance = req.body.distance;
  var per_km = req.body.per_km;
  var to_amount = req.body.to_amount;

 var respo ={
   Origin: origin,
   Destination: desti,
   Distance: distance,
   Per_Km: per_km,
   Total_Amount: to_amount
 };

// Gmap.insert({respo}, function(err, res){
//      if (err) {
//        console.log(err);
//      }else {
//        console.log(res);
//      }

 db.collection("googlemaps").insert({
   Origin: origin,
   Destination: desti,
   Distance: distance,
   Per_Km: per_km,
   Total_Amount: to_amount
 }, function(er, res){
   if (er) {
     console.log(er);
   }else {
     console.log(res);
   }
 })

  res.send(respo)
  // res.send(" Origin:"+origin+", Destination: "+desti+", Ditance: "+distance+", per_km: "+per_km+", Total Amount: "+to_amount)
})
app.use((err, req, res, next) =>{
  res.status(400).json('inpu error');
});

app.get("/google", function(req, res){
  console.log("Get google request");

  db.collection("googlemaps").find({}).toArray(function(er, map){
  if (er) {
  console.log(er);
  }else {
     console.log(map);
     res.send(map);
  }

  })
})

app.post('/login',valid,(req, res) =>{

      var name = req.body.fname
      res.send('Hi '+name)

})
// app.use(errors())
app.use((err, req, res, next) =>{
  res.status(400).json('there is an error');
});

app.get('/Balu', function(req,res){
  console.log("Get Response");
    res.send("Balu Sonawane");
});

/* app.get('/:user', function(req,res){
  res.send(req.params.user);
}); */

app.get('*',(req,res) =>{
res.send("404 Not Found");
});

app.listen(port,function(){
  console.log("Server runing on " + port);
})


/* var express = require('express');
var app = express();

app.get('/', function(req, res){
   res.send("Hello world!");
});

app.listen(3000); */
