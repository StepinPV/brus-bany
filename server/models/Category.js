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
    },
    order: {
        type: Number,
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

const equipmentScheme = new Schema({
    name: {
        type: String,
        required: REQUIRED_MSG
    },
    text: {
        type: String,
        required: REQUIRED_MSG
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
            order: {
                type: Number,
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
    id: {
        type: String,
        required: REQUIRED_MSG
    },
    order: {
        type: Number,
        required: REQUIRED_MSG
    },
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
    useInBuildingPrice: {
        type: Boolean
    },
    required: {
        type: Boolean
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
            order: {
                type: Number,
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
                type: String,
                required: REQUIRED_MSG
            },
            condition: {
                type: String
            },
            price: Object
        }]
    },
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
    name4: {
        type: String,
        required: REQUIRED_MSG
    },
    additions: {
        type: [additionGroupScheme]
    },
    filters: {
        type: [filterScheme]
    },
    equipment: {
        type: [equipmentScheme]
    },
    projectBlocks: {
        type: [projectBlockScheme]
    },
    complectationBlocks: {
        type: complectationBlockScheme
    },
    article: Object,
    updated: Date
}, { versionKey: false });

module.exports = mongoose.model(COLLECTION_NAME, scheme);
