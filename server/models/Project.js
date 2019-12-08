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
    materialsPrice: {
        type: Number
    },
    buildTime: {
        type: Number,
        required: REQUIRED_MSG
    },
    profitPercentage: {
        type: Number,
        required: REQUIRED_MSG,
        default: 20
    },
    images: {
        type: Object,
        default: {}
    },
    projectBlocks: {
        type: Object,
        default: {}
    },
    material: {
        type: [{
            id: {
                type: Schema.Types.ObjectId,
                ref: 'materials'
            },
            count: {
                type: Number,
                required: true
            }
        }],
        default: []
    },
    updated: Date
}, { versionKey: false });

scheme.pre('save', function(next) {
    if (!this.updated) {
        this.updated = new Date();
    }
    next();
});

scheme.pre('updateOne', function() {
    this.set({ updated: new Date() });
});

module.exports = mongoose.model(COLLECTION_NAME, scheme);
