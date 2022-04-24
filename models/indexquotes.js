const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const indexQuotes = new Schema({
    quote: String,
    author: String
})

const Quote = mongoose.model("Quote", indexQuotes);

module.exports = Quote;