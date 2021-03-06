var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    title: String,
    author: String,
    body: String,
    created_at: {
        type: Date,
        default: function () {
            return Date.now();
        }
    },
    updated_at: {
        type: Date,
        default: function () {
            return Date.now();
        }
    }

});

postSchema.set('toJSON', {
    virtual: true
});

module.exports = mongoose.model("Blog", postSchema);