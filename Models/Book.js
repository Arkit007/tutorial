var mongoose = require('mongoose');

var BookSchema = mongoose.Schema({
    name:String,
    author:String
})

module.exports = mongoose.model("Book",BookSchema)
