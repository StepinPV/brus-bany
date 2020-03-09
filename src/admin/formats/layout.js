export default [{
    _id: 'name',
    title: 'Имя',
    type: 'string',
    required: true,
    description: 'Имя планировки на русском языке'
}, {
    _id: 'width',
    title: 'Ширина',
    required: true,
    type: 'float number'
}, {
    _id: 'length',
    title: 'Длина',
    type: 'float number',
    required: true
}, {
    _id: 'area',
    title: 'Общая площадь',
    type: 'float number',
    required: true
}, {
    _id: 'roofArea',
    title: 'Площадь крыши',
    type: 'float number',
    required: true
}, {
    _id: 'frameArea',
    title: 'Площадь сруба',
    type: 'float number',
    required: true
}, {
    _id: 'warmArea',
    title: 'Теплая площадь',
    type: 'float number',
    required: true
}, {
    _id: 'perimeter',
    title: 'Периметр',
    type: 'float number',
    required: true
}, {
    _id: 'stiltCount',
    title: 'Количество свай',
    type: 'integer number',
    required: true
}, {
    _id: 'floor',
    title: 'Этаж',
    type: 'array',
    format: [{
        _id: 'wallLength',
        title: 'Длина стен',
        type: 'float number',
        required: true
    }, {
        _id: 'wallHeight',
        title: 'Высота стен',
        type: 'float number',
        required: true
    }, {
        _id: 'partitionLength',
        title: 'Длина перегородок',
        type: 'float number',
        required: true
    }, {
        _id: 'roomCount',
        title: 'Количество комнат',
        type: 'integer number',
        required: true
    }, {
        _id: 'ceilingArea',
        title: 'Площадь потолка',
        type: 'float number',
        required: true
    }, {
        _id: 'warmArea',
        title: 'Теплая площадь',
        type: 'float number',
        required: true
    }, {
        _id: 'balcony',
        title: 'Балкон',
        type: 'object',
        format: [{
            _id: 'area',
            title: 'Площадь',
            type: 'float number',
            required: true
        }]
    }, {
        _id: 'toilet-bathroom',
        title: 'Туалет-ванная',
        type: 'array',
        format: [{
            _id: 'area',
            title: 'Площадь',
            type: 'float number',
            required: true
        }]
    }, {
        _id: 'toilet',
        title: 'Туалет',
        type: 'array',
        format: [{
            _id: 'area',
            title: 'Площадь',
            type: 'float number',
            required: true
        }]
    }, {
        _id: 'bathroom',
        type: 'array',
        title: 'Ванная',
        format: [{
            _id: 'area',
            title: 'Площадь',
            type: 'float number',
            required: true
        }]
    }, {
        _id: 'restroom',
        type: 'array',
        title: 'Комната отдыха',
        format: [{
            _id: 'area',
            title: 'Площадь',
            type: 'float number',
            required: true
        }]
    }, {
        _id: 'pantry',
        type: 'array',
        title: 'Кладовка',
        format: [{
            _id: 'area',
            title: 'Площадь',
            type: 'float number',
            required: true
        }]
    }, {
        _id: 'steamRoom',
        type: 'array',
        title: 'Парная',
        format: [{
            _id: 'area',
            title: 'Площадь',
            type: 'float number',
            required: true
        }]
    }, {
        _id: 'washingRoom',
        type: 'array',
        title: 'Мойка',
        format: [{
            _id: 'area',
            title: 'Площадь',
            type: 'float number',
            required: true
        }]
    }]
}, {
    _id: 'porch',
    title: 'Крыльцо',
    type: 'object',
    format: [{
        _id: 'area',
        title: 'Площадь',
        type: 'float number',
        required: true
    }]
}, {
    _id: 'terrace',
    title: 'Терраса',
    type: 'object',
    format: [{
        _id: 'area',
        title: 'Площадь',
        type: 'float number',
        required: true
    }]
}, {
    _id: 'attic',
    title: 'Мансарда',
    type: 'object',
    format: [{
        _id: 'area',
        title: 'Площадь',
        type: 'float number',
        required: true
    }, {
        _id: 'wallLength',
        title: 'Длина стен',
        type: 'float number',
        required: true
    }, {
        _id: 'wallHeight',
        title: 'Высота стен',
        type: 'float number',
        required: true
    }, {
        _id: 'ceilingArea',
        title: 'Площадь потолка',
        type: 'float number',
        required: true
    }, {
        _id: 'partitionLength',
        title: 'Длина перегородок',
        type: 'float number'
    }]
}];
