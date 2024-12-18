const mongoose = require('mongoose');

const PersonProjectSchema = mongoose.Schema({
    personEmailAddress: {
        type: String,
    },
    projectId: {
        type: String,
    }
}, {
    collection: 'Person-Project' // Explicitly specify the collection name
});

module.exports = mongoose.model('PersonProject', PersonProjectSchema);
