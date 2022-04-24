const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quoteScheme = new Schema({
  quote: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  page: {
    type: String,
    required: false,
  },
  year: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  publisher: {
    type: String,
    required: false,
  },
  place: {
    type: String,
    required: false,
  },
});

const MemberQuote = mongoose.model("MemberQuote", quoteScheme);

module.exports = MemberQuote;
