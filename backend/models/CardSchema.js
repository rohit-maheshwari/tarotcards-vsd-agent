const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
    cardName: {
        type: String,
    },
    cardQuestions: {
        type: [String],
    }
}, {
    collection: 'Card' // Explicitly specify the collection name
});

module.exports = mongoose.model('Card', CardSchema);
