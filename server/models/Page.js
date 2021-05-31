const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const COLLECTION_NAME = 'pages';

const scheme = new Schema({
    url: String,
    config: Object,
    updated: Date
}, {
    versionKey: false,
    strict: false,
    strictQuery: true
});

module.exports = mongoose.model(COLLECTION_NAME, scheme);
