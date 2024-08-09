const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
    emailAddress: {
        type: String,
    },
    name: {
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
