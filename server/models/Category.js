const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const COLLECTION_NAME = 'categories';
const REQUIRED_MSG = 'Поле обязательно для заполнения!';

const additionScheme = new Schema({
    id: {
        type: Number,
        required: REQUIRED_MSG
    },
    name: {
        type: String,
        required: REQUIRED_MSG
    },
    price: {
        type: String,
        required: REQUIRED_MSG
    },
    type: {
        type: String,
        required: REQUIRED_MSG
    }
});

const filterScheme = new Schema({
    id: {
        type: String,
        required: REQUIRED_MSG
    },
    name: {
        type: String,
        required: REQUIRED_MSG
    },
    condition: {
        type: String,
        required: REQUIRED_MSG
    }
});

const additionGroupScheme = new Schema({
    id: {
        type: Number,
        required: REQUIRED_MSG
    },
    name: {
        type: String,
        required: REQUIRED_MSG
    },
    value: {
        type: [additionScheme]
    }
});

const scheme = new Schema({
    translateName: {
        type: String,
        required: REQUIRED_MSG
    },
    name: {
        type: String,
        required: REQUIRED_MSG
    },
    name2: {
        type: String,
        required: REQUIRED_MSG
    },
    name3: {
        type: String,
        required: REQUIRED_MSG
    },
    additions: {
        type: [additionGroupScheme]
    },
    filters: {
        type: [filterScheme]
    },
    article: Object
}, { versionKey: false });

module.exports = mongoose.model(COLLECTION_NAME, scheme);
