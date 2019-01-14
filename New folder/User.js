var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/userdb');
console.log("welcome");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
    console.log("connection successfull");

var userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    email: {type: String},
    password: {type: String},
});
var user = mongoose.model('user', userSchema);
var newuser= new user({
    username:'shubhi',
    email:'sk2511@gmail.com',
    password:'12345',
});
newuser.save(function(err, User){
    if (err) return console.error(err);
    console.log('saved');
});
});
