const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const COLLECTION_NAME = 'categories';
const REQUIRED_MSG = 'Поле обязательно для заполнения!';

const additionScheme = new Schema({
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

const additionGroupScheme = new Schema({
    name: {
        type: String,
        required: REQUIRED_MSG
    },
    value: {
        type: [additionScheme]
    }
});

const deliveryDataScheme = new Schema({
    delivery: {
        type: String,
        required: REQUIRED_MSG
    },
    additions: {
        type: [additionGroupScheme]
    }
});

const complectationBlockScheme = new Schema({
    name: {
        type: String,
        required: REQUIRED_MSG
    },
    description: {
        type: String
    },
    itemTitle: {
        type: String,
        required: REQUIRED_MSG
    },
    itemButtonTitle: {
        type: String,
        required: REQUIRED_MSG
    },
    defaultItemId: {
        type: String
    },
    items: {
        type: [{
            id: {
                type: String,
                required: REQUIRED_MSG
            },
            title: {
                type: String,
                required: REQUIRED_MSG
            },
            name: {
                type: String,
                required: REQUIRED_MSG
            },
            description: {
                type: String
            },
            image: {
                type: String
            }
        }]
    },
});

const projectBlockScheme = new Schema({
    name: {
        type: String,
        required: REQUIRED_MSG
    },
    description: {
        type: String
    },
    itemTitle: {
        type: String,
        required: REQUIRED_MSG
    },
    itemButtonTitle: {
        type: String,
        required: REQUIRED_MSG
    },
    items: {
        type: [{
            title: {
                type: String,
                required: REQUIRED_MSG
            },
            name: {
                type: String,
                required: REQUIRED_MSG
            },
            description: {
                type: String
            },
            image: {
                type: String,
                required: REQUIRED_MSG
            },
            condition: {
                type: String
            },
            price: {
                type: String,
                required: REQUIRED_MSG
            }
        }]
    },
});

const scheme = new Schema({
    rootTranslateName: {
        type: String,
        required: REQUIRED_MSG
    },
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
    name4: {
        type: String,
        required: REQUIRED_MSG
    },
    name5: {
        type: String,
        required: REQUIRED_MSG
    },
    h1: {
        type: String,
        required: REQUIRED_MSG
    },
    'seo-title': {
        type: String,
        required: REQUIRED_MSG
    },
    additions: {
        type: [additionGroupScheme]
    },
    filters: {
        type: Array
    },
    projectBlocks: {
        type: [projectBlockScheme]
    },
    complectationBlocks: {
        type: complectationBlockScheme
    },
    deliveryData: {
        type: deliveryDataScheme
    },
    article: Object,
    updated: Date
}, {
    versionKey: false,
    strict: false,
    strictQuery: true
});

module.exports = mongoose.model(COLLECTION_NAME, scheme);
