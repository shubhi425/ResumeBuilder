/*var express = require("express");
var app = express();
var path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res){
res
.status(200)
.sendFile(path.join(__dirname, "public", "home.html"));

});
app.listen(3000, function(){
console.log("Welcome to the server");
});*/
var express = require('express')
var MongoClient = require('mongodb').MongoClient;
var app = express();
app.set('view engine', 'ejs');
var mongoose = require('mongoose');
var db = mongoose.connection;
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/userdb');
//var alert=require('alert-node');
var sschema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
});
var fschema = mongoose.Schema({
    firstname:String,
    Lastname:String,
    Address:String,
    City:String,
    State:String,
    Phone:String,
    Email:String,
    Summary:String,
    Skills:String,
    Academic_Details:String,
    Projects:String,
    Certifications:String,
    Personal_Intrests:String,

});
var Eschema = mongoose.Schema({
    firstname:String,
    Lastname:String,
    Address:String,
    City:String,
    State:String,
    Phone:String,
    Email:String,
    Summary:String,
    Skills:String,
    Academic_Details:String,
    Projects:String,
    Certifications:String,
    Personal_Intrests:String,

});
var user = mongoose.model('user', sschema);

app.get('/', function(req, res){//app.all for all get adn post
   res.sendFile(__dirname+ '/home.html');
});
app.post('/', function(req, res){
   /* var data="";req.on("data",function(chunk){data+=chunk;})req.on("end",function(chunk){//console.log(data);var q=querystring.parse(data);
    console.log(q);
    });*/ 
    var data=req.body;
       var user = mongoose.model('user', sschema);
       var u=new user({
       username:data.username,
       email:data.email,
       password:data.password
       
   });
       u.save(function (err, user) {
         if (err) return console.error(user);
         console.log('saved');
       });
       res.render('login');
});
app.get('/login',function(req,res){
   console.log("login get");
    res.render('login');
});
app.get('/home',function(req,res){
    console.log("login get");
     res.render('home');
 });
app.get('/signup',function(req,res){
    console.log("signup get");
    res.render('signup');
});

app.post('/dashboard',function(req,res){
    console.log("dashboard post");
    user.findOne({ 
        email: req.body.email,
        password:req.body.password }, function(err, user) {
          // hanlde err..
          if (user) {
            console.log('found'); 
            res.render('dashboard'); 
          } else {
            console.log('not found');
            res.sendFile(__dirname+'/signup');
          }
       });

    

   // 
});
app.get('/dashboard',function(req,res){
    console.log('dashboard get');
    user.find({},function(err,user){
        if(err)
        res.json(err);
        res.render('dashboard');
    });


});
app.get('/fresher',function(req,res){
    console.log("fresher get");
    user.find({},function(err,user){
        if(err)
        res.json(err);
        res.render('fresher');
    });
});
app.get('/employee',function(req,res){
    console.log("employee get");
    user.find({},function(err,user){
        if(err)
        res.json(err);
        res.render('employee');
    });
    //res.render('employee');
});
app.listen(3000);