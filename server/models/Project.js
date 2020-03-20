const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const COLLECTION_NAME = 'projects';
const REQUIRED_MSG = 'Поле обязательно для заполнения!';

const scheme = new Schema({
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: REQUIRED_MSG
    },
    layoutId:  {
        type: Schema.Types.ObjectId,
        ref: 'layouts',
        required: REQUIRED_MSG
    },
    price: {
        type: Number,
        required: REQUIRED_MSG
    },
    prices: {
        type: Object
    },
    buildTime: {
        type: Number,
        required: REQUIRED_MSG
    },
    images: {
        type: Object,
        default: {}
    },
    projectBlocks: {
        type: Object,
        default: {}
    },
    updated: Date
}, { versionKey: false });

module.exports = mongoose.model(COLLECTION_NAME, scheme);
