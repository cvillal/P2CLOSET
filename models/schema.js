const mongoose = require('mongoose');

const closetSchema = new mongoose.Schema({
    image: String,
    type: String,
    season: String,
    feels: Number,
    tags:[String]
});

const Closet = mongoose.model('Closet', closetSchema);
module.exports = Closet;