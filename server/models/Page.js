const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const COLLECTION_NAME = 'pages';
const REQUIRED_MSG = 'Поле обязательно для заполнения!';

const scheme = new Schema({
    url: {
        type: String,
        required: REQUIRED_MSG
    },
    config: Object,
    updated: Date
}, {
    versionKey: false,
    strict: false,
    strictQuery: true
});

module.exports = mongoose.model(COLLECTION_NAME, scheme);
