const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const booksSchema = new Schema({
    name: String, 
    author: String,
    year: Number,
    image: String,
}, {
    timeseries: true,
    versionKey: false
}
);

module.exports = mongoose.model('Books', booksSchema);