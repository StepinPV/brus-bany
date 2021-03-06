export const main = [{
    _id: 'name',
    title: 'Имя страницы',
    type: 'string'
}, {
    _id: 'url',
    title: 'URL',
    type: 'string',
    required: true
}, {
    _id: 'test',
    title: 'Страница в работе',
    type: 'boolean'
}];

export const config = [{
    _id: 'seoMeta',
    title: 'Мета теги',
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
}, {
    _id: 'priority',
    title: 'Приоритет от 0 до 1',
    type: 'string'
}, {
    _id: 'template',
    title: 'Шаблон страницы',
    type: 'source-select',
    source: 'page-templates',
    hasEmpty: true
}, {
    _id: 'folder',
    title: 'Папка',
    type: 'source-select',
    source: 'page-folders'
}];
