const balconies = {
    _id: 'balconies',
    title: 'Балконы',
    type: 'array',
    format: [{
        _id: 'area',
        title: 'Площадь',
        type: 'float number',
        required: true
    }]
};

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
    _id: 'roof',
    title: 'Форма крыши',
    type: 'select',
    items: [{
        id: 'a',
        title: 'Двухскатная'
    }, {
        id: 'b',
        title: 'Ломаная'
    }, {
        id: 'c',
        title: 'Вальмовая'
    }]
}, {
    _id: 'roofHeight',
    title: 'Длина ската крыши (м)',
    type: 'float number',
    required: true
}, {
    _id: 'skateHeight',
    title: 'Высота конька (м)',
    type: 'float number',
    required: true
}, {
    _id: 'pedimentArea',
    title: 'Площадь фронтона (м)',
    type: 'float number',
    required: true
}, {
    _id: 'floor',
    title: 'Этажы',
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
    }, balconies, {
        _id: 'toilet-bathroom',
        title: 'Туалеты-ванные',
        type: 'array',
        format: [{
            _id: 'area',
            title: 'Площадь',
            type: 'float number',
            required: true
        }]
    }, {
        _id: 'toilet',
        title: 'Туалеты',
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
        title: 'Ванные',
        format: [{
            _id: 'area',
            title: 'Площадь',
            type: 'float number',
            required: true
        }]
    }, {
        _id: 'restroom',
        type: 'array',
        title: 'Комнаты отдыха',
        format: [{
            _id: 'area',
            title: 'Площадь',
            type: 'float number',
            required: true
        }]
    }, {
        _id: 'pantry',
        type: 'array',
        title: 'Кладовки',
        format: [{
            _id: 'area',
            title: 'Площадь',
            type: 'float number',
            required: true
        }]
    }, {
        _id: 'steamRoom',
        type: 'array',
        title: 'Парные',
        format: [{
            _id: 'area',
            title: 'Площадь',
            type: 'float number',
            required: true
        }]
    }, {
        _id: 'washingRoom',
        type: 'array',
        title: 'Мойки',
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
    }, balconies]
}, {
    _id: 'terrace',
    title: 'Терраса (для бань)',
    type: 'object',
    format: [{
        _id: 'area',
        title: 'Площадь',
        type: 'float number',
        required: true
    }]
}, {
    _id: 'terraces',
    title: 'Террасы (для домов)',
    type: 'array',
    format: [{
        _id: 'area',
        title: 'Площадь',
        type: 'float number',
        required: true
    }]
}];
