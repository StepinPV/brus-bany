import templateFields from './template-fields';

export default [{
    _id: 'name',
    title: 'Имя',
    type: 'string',
    required: true
}, {
    _id: 'folder',
    title: 'Папка',
    type: 'source-select',
    source: 'page-folders'
}, templateFields, {
    _id: 'feeds',
    title: 'Feeds',
    itemTitleField: 'file-name',
    type: 'array',
    format: [{
        _id: 'file-name',
        title: 'Имя файла',
        type: 'string',
        required: true
    }, {
        _id: 'container',
        title: 'Контейнер',
        type: 'text-simple',
        required: true
    }, {
        _id: 'body',
        title: 'Тело',
        type: 'text-simple',
        required: true
    }, {
        _id: 'filter',
        title: 'Фильтр',
        type: 'text-simple'
    }]
}];
