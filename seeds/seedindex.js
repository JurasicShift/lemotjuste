const mongoose = require('mongoose');
const Quote = require("../models/indexQuotes");
const quoteData = require("./quotes");

mongoose.connect('mongodb://localhost:27017/lemotjuste', {
useNewUrlParser: true,
useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected"); 
})

const seedDB = async () => {
    await Quote.deleteMany({});
    for(let i = 0; i < quoteData.length; i++) {
        const quote = new Quote ({
            quote: quoteData[i].quote,
            author: quoteData[i].author
        });
        await quote.save();
    }
  
}

seedDB().then(() => {
    mongoose.connection.close();
})