const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    projectId: {
        type: String,
    },
    projectCreateDate: {
        type: Date,
    },
    projectSubfield: {
        type: String,
    },
    projectTitle: {
        type: String,
    },
    projectDescription: {
        type: String,
    },
    projectTakeaways: {
        type: String,
    },
    subfieldId: {
        type: String,
    }
}, {
    collection: 'Project' // Explicitly specify the collection name
});

module.exports = mongoose.model('Project', ProjectSchema);
