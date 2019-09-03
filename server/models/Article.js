const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const COLLECTION_NAME = 'articles';
const REQUIRED_MSG = 'Поле обязательно для заполнения!';

const scheme = new Schema({
    name: {
        type: String,
        required: REQUIRED_MSG
    },
    translateName: {
        type: String,
        required: REQUIRED_MSG
    },
    image: {
        type: String,
        required: REQUIRED_MSG
    },
    article: Object,
    created: Date
}, { versionKey: false });

scheme.pre('save', function(next) {
    if (!this.created) this.created = new Date();
    next();
});

module.exports = mongoose.model(COLLECTION_NAME, scheme);
