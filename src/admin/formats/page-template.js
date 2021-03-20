import templateFields from './template-fields';

export default [{
    _id: 'name',
    title: 'Имя',
    type: 'string',
    required: true
}, {
    _id: 'priority',
    title: 'Приоритет от 0 до 1',
    type: 'string'
}, {
    _id: 'seoMeta',
    title: 'Шаблоны мета тегов',
    type: 'object',
    format: [{
        _id: 'title',
        title: 'SEO title',
        type: 'string'
    }, {
        _id: 'description',
        title: 'SEO description',
        type: 'string'
    }]
}, templateFields];
