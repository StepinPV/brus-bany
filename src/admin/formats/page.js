export const main = [{
    _id: 'url',
    title: 'URL',
    type: 'string',
    required: true
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
        type: 'text'
    }]
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
