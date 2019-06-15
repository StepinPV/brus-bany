const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const COLLECTION_NAME = 'materials';
const REQUIRED_MSG = 'Поле обязательно для заполнения!';

const scheme = new Schema({
    dimension: {
        type: String,
        required: REQUIRED_MSG
    },
    name: {
        type: String,
        required: REQUIRED_MSG
    },
    price: {
        type: Number,
        required: REQUIRED_MSG
    }
}, { versionKey: false });

module.exports = mongoose.model(COLLECTION_NAME, scheme);
