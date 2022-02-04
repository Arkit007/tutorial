var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    uname:String,
    password:String
})

module.exports = mongoose.model("users",userSchema)
