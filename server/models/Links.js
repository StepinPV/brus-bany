const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const COLLECTION_NAME = 'links';
const REQUIRED_MSG = 'Поле обязательно для заполнения!';

const scheme = new Schema({
    from: {
        type: String,
        required: REQUIRED_MSG
    },
    to: {
        type: String,
        required: REQUIRED_MSG
    }
}, {
    versionKey: false,
    strict: false,
    strictQuery: true
});

module.exports = mongoose.model(COLLECTION_NAME, scheme);
