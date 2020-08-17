const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const COLLECTION_NAME = 'page-folders';

const scheme = new Schema({
    updated: Date
}, {
    versionKey: false,
    strict: false,
    strictQuery: true
});

module.exports = mongoose.model(COLLECTION_NAME, scheme);
