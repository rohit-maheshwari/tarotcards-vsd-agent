const mongoose = require('mongoose');

// TODO: Figure out the schema of the item that we want to insert to the database
const ItemSchema = mongoose.Schema({
    time_stamp: {
        type: String,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
        required: [true, "Please enter a project description"]
    },
    card: {
        type: String,
    },
    card_response: {
        type: String,
    },
    finished: {
        type: Boolean,
    },
    user_name: {
        type: String,
    },
    user_email: {
        type: String,
    },
    user_id: {
        type: String,
    },
    session_id: {
        type: Number,
    }
});

module.exports = mongoose.model('Item', ItemSchema);
