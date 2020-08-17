export default [{
    _id: 'name',
    title: 'Имя',
    type: 'string',
    required: true
}, {
    _id: 'page-fields',
    title: 'Поля страниц',
    itemTitleField: 'slug',
    type: 'array',
    format: [{
        _id: 'slug',
        title: 'Идентификатор',
        type: 'string',
        required: true
    }, {
        _id: 'item',
        title: 'Тип',
        type: 'oneOf',
        variants: [{
            id: 'string',
            typeTitle: 'Строка',
            title: 'Имя поля',
            type: 'string'
        }, {
            id: 'text',
            typeTitle: 'Текст',
            title: 'Имя поля',
            type: 'string'
        }, {
            id: 'date',
            typeTitle: 'Дата',
            title: 'Имя поля',
            type: 'string'
        }, {
            id: 'image',
            typeTitle: 'Изображение',
            title: 'Имя поля',
            type: 'string'
        }, {
            id: 'integer number',
            typeTitle: 'Число',
            title: 'Имя поля',
            type: 'string'
        }]
    }]
}];
