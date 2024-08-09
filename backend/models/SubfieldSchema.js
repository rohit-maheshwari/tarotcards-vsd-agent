const mongoose = require('mongoose');

const SubfieldSchema = mongoose.Schema({
    subfield_id: {
        type: String,
    },
    subfield_name: {
        type: String,
    }
}, {
    collection: 'Subfield' // Explicitly specify the collection name
});

module.exports = mongoose.model('Subfield', SubfieldSchema);
