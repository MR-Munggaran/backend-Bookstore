const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        publishYear: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const Book = mongoose.model('Books', bookSchema);

module.exports = Book;
