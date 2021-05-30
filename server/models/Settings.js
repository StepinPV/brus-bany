const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const COLLECTION_NAME = 'settings';

const scheme = new Schema({
    name: String,
    settings: String
}, {
    versionKey: false,
    strict: false,
    strictQuery: true
});

module.exports = mongoose.model(COLLECTION_NAME, scheme);
