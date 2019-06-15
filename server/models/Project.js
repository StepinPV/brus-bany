const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const COLLECTION_NAME = 'projects';
const REQUIRED_MSG = 'Поле обязательно для заполнения!';

const scheme = new Schema({
    _id: {
        type: String,
        required: REQUIRED_MSG
    },
    categoryId: {
        type: String,
        required: REQUIRED_MSG
    },
    layoutId: {
        type: String,
        required: REQUIRED_MSG
    },
    price: {
        type: Number,
        required: REQUIRED_MSG
    },
    profitPercentage: {
        type: Number,
        required: REQUIRED_MSG,
        default: 20
    },
    images: {
        type: Object
    },
    materials: {
        type: Object
    }
}, { versionKey: false });

module.exports = mongoose.model(COLLECTION_NAME, scheme);
