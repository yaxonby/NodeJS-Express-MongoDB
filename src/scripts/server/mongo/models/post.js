var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    title: String,
    author: String,
    body: String
});

module.exports = mongoose.model("Blog", postSchema);