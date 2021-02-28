export default {
    _id: 'page-fields',
    title: 'Шаблонные поля',
    itemTitleField: 'name',
    type: 'array',
    format: [{
        _id: 'name',
        title: 'Имя поля',
        type: 'string',
        required: true
    }, {
        _id: 'id',
        title: 'Идентификатор',
        disabled: true,
        type: 'string'
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
        }, {
            id: 'boolean',
            title: 'Флаг'
        }]
    }]
};
