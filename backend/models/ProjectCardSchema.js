const mongoose = require('mongoose');

const ProjectCardSchema = mongoose.Schema({
    projectId: {
        type: String,
    },
    cardName: {
        type: String,
    },
    createDate: {
        type: Number,
    },
    answers: {
        type: String,
    }
}, {
    collection: 'Project-Card' // Explicitly specify the collection name
});

module.exports = mongoose.model('ProjectCard', ProjectCardSchema);
