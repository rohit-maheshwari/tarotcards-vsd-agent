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
    card: {
        type: String,
    },
    card_responses: {
        type: {},
    },
    user_id: {
        type: Number,
    },
    session_id: {
        type: Number,
    }
});

module.exports = mongoose.model('Item', ItemSchema);
