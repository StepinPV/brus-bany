const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const COLLECTION_NAME = 'photos';
const REQUIRED_MSG = 'Поле обязательно для заполнения!';

const scheme = new Schema({
    projectId:  {
        type: Schema.Types.ObjectId,
        ref: 'projects',
        required: REQUIRED_MSG
    },
    created: {
        type: Date,
        required: REQUIRED_MSG
    },
    mainPhoto: {
        type: String,
        required: REQUIRED_MSG
    },
    mainPhotoAlt: {
        type: String,
        required: REQUIRED_MSG
    },
    description: {
        type: String
    },
    feedback: {
        type: String
    },
    videoFeedback: {
        type: String
    },
    video: {
        type: String
    },
    clientPhoto: {
        type: String
    },
    photos: {
        type: [{
            image: String,
            imageAlt: {
                type: String,
                required: REQUIRED_MSG
            }
        }]
    },
    updated: Date
}, { versionKey: false });

scheme.pre('save', function(next) {
    if (!this.updated) {
        this.updated = new Date();
    }
    next();
});

scheme.pre('updateOne', function() {
    this.set({ updated: new Date() });
});

module.exports = mongoose.model(COLLECTION_NAME, scheme);
