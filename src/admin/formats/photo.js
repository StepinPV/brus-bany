export default [{
    _id: 'created',
    title: 'Дата строительства',
    type: 'date',
    required: true
}, {
    _id: 'mainPhoto',
    title: 'Главное изображение',
    type: 'image',
    required: true
}, {
    _id: 'photos',
    title: 'Изображение',
    type: 'array',
    format: [{
        _id: 'image',
        title: 'Изображение',
        type: 'image'
    }]
}];
