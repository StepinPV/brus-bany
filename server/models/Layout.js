const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const COLLECTION_NAME = 'layouts';
const REQUIRED_MSG = 'Поле обязательно для заполнения!';

const area = {
    type: Number,
    required: REQUIRED_MSG
};

const wallLength = {
    type: Number,
    required: REQUIRED_MSG
};

const wallHeight = {
    type: Number,
    required: REQUIRED_MSG
};

const ceilingArea = {
    type: Number,
    required: REQUIRED_MSG
};

const floorScheme = new Schema({
    wallLength,
    wallHeight,
    partitionLength: {
        type: Number,
        required: REQUIRED_MSG
    },
    roomCount: {
        type: Number,
        required: REQUIRED_MSG
    },
    ceilingArea,
    warmArea: {
        type: Number,
        required: REQUIRED_MSG
    },
    balcony: {
        type: {
            area
        }
    },
    'toilet-bathroom': {
        type: {
            area
        }
    },
    toilet: {
        type: {
            area
        }
    },
    bathroom: {
        type: {
            area
        }
    },
    restroom: {
        type: {
            area
        }
    },
    pantry: {
        type: {
            area
        }
    },
    vestibule: {
        type: {
            area
        }
    },
    steamRoom: {
        type: {
            area
        }
    },
    washingRoom: {
        type: {
            area
        }
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
    width: {
        type: Number,
        required: REQUIRED_MSG
    },
    length: {
        type: Number,
        required: REQUIRED_MSG
    },
    area,
    roofArea: {
        type: Number,
        required: REQUIRED_MSG
    },
    frameArea: {
        type: Number,
        required: REQUIRED_MSG
    },
    warmArea: {
        type: Number,
        required: REQUIRED_MSG
    },
    perimeter: {
        type: Number,
        required: REQUIRED_MSG
    },
    stiltCount: {
        type: Number,
        required: REQUIRED_MSG
    },
    floor: {
        type: [floorScheme],
        validate: [floors => floors && floors.length > 0, 'Должен быть хотя бы 1 этаж!']
    },
    porch: {
        type: {
            area
        }
    },
    terrace: {
        type: {
            area
        }
    },
    attic: {
        type: {
            area,
            wallLength,
            wallHeight,
            ceilingArea
        }
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
