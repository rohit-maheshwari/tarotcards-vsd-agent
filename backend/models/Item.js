const mongoose = require('mongoose');

// TODO: Figure out the schema of the item that we want to insert to the database
const ItemSchema = mongoose.Schema({
    time_stamp: {
        type: String,
    }, 
    description: {
        type: String,
        required: [true, "Please enter a project description"]
    },
    cards: {
        type: Array,
    },
    card_responses: {
        type: Array,
        
    },
    user_id: {
        type: Number,
    },
    session_id: {
        type: Number,
    }
});

module.exports = mongoose.model('Item', ItemSchema);
