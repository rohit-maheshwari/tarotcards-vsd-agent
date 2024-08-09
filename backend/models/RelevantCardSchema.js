const mongoose = require('mongoose');

const RelatedCardSchema = mongoose.Schema({
    subfield_id: {
        type: String,
    },
    card_id: {
        type: String,
    }
}, {
    collection: 'RelevantCard' // Explicitly specify the collection name
});

module.exports = mongoose.model('RelatedCard', RelatedCardSchema);
