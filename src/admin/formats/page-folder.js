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
}, {
    _id: 'page-fields',
    title: 'Поля страниц',
    itemTitleField: 'name',
    type: 'array',
    format: [{
        _id: 'name',
        title: 'Имя поля',
        type: 'string',
        required: true
    }, {
        _id: 'type',
        title: 'Тип',
        type: 'select',
        items: [{
            id: 'string',
            title: 'Строка'
        }, {
            id: 'text',
            title: 'Текст'
        }, {
            id: 'date',
            title: 'Дата'
        }, {
            id: 'image',
            title: 'Изображение'
        }, {
            id: 'integer number',
            title: 'Число'
        }]
    }]
}];
