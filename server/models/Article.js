const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const COLLECTION_NAME = 'articles';
const REQUIRED_MSG = 'Поле обязательно для заполнения!';

const scheme = new Schema({
    translateName: {
        type: String,
        required: REQUIRED_MSG
    },
    article: Object,
    created: Date,
    updated: Date
}, { versionKey: false });

module.exports = mongoose.model(COLLECTION_NAME, scheme);
