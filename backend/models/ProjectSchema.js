const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    projectId: {
        type: Number,
    },
    projectCreateDate: {
        type: Date,
    },
    projectName: {
        type: String,
    },
    projectTitle: {
        type: String,
    },
    projectDescription: {
        type: String,
    },
    subfieldId: {
        type: String,
    }
}, {
    collection: 'Project' // Explicitly specify the collection name
});

module.exports = mongoose.model('Project', ProjectSchema);
