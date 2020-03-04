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
    _id: 'mainPhotoAlt',
    title: 'Alt для главное изображение',
    type: 'string'
}, {
    _id: 'description',
    title: 'Описание бани',
    type: 'text'
}, {
    _id: 'feedback',
    title: 'Текстовый отзыв',
    type: 'text'
}, {
    _id: 'clientPhoto',
    title: 'Фотография клиента',
    type: 'image'
}, {
    _id: 'videoFeedback',
    title: 'Ссылка на видеоотзыв на youtube',
    type: 'string'
}, {
    _id: 'video',
    title: 'Ссылка на видеообзор на youtube',
    type: 'string'
}, {
    _id: 'photos',
    title: 'Изображение',
    type: 'array',
    format: [{
        _id: 'image',
        title: 'Изображение',
        type: 'image'
    }, {
        _id: 'imageAlt',
        title: 'Alt',
        type: 'string'
    }]
}];
