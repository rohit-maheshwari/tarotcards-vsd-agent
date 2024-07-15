const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
    personId: {
        type: Number,
    },
    emailAddress: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    classStanding: {
        type: String,
    },
    graduationDate: {
        type: String,
    }
}, {
    collection: 'Person' // Explicitly specify the collection name
});

module.exports = mongoose.model('Person', PersonSchema);
