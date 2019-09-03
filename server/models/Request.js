const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const COLLECTION_NAME = 'requests';
const REQUIRED_MSG = 'Поле обязательно для заполнения!';

const scheme = new Schema({
    name: {
        type: String,
        required: REQUIRED_MSG
    },
    phone: {
        type: String,
        required: REQUIRED_MSG
    },
    source: {
        type: String
    },
    created: Date
}, { versionKey: false });

module.exports = mongoose.model(COLLECTION_NAME, scheme);
