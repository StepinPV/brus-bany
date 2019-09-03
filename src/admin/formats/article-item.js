import article from './article';

export default [{
    _id: 'translateName',
    title: 'Название статьи транслитом',
    type: 'string',
    required: true
}, {
    _id: 'name',
    title: 'Название статьи',
    type: 'string',
    required: true
}, {
    _id: 'image',
    title: 'Изображение для обложки',
    type: 'image',
    required: true
}, {
    _id: 'article',
    title: 'Содержимое',
    type: 'object',
    format: article
}];
