export const props = [{
    _id: 'items',
    title: 'Элементы списка',
    type: 'array',
    itemTitleField: 'text',
    format: [{
        _id: 'text',
        title: 'Текст',
        type: 'text'
    }]
}, {
    _id: 'type',
    title: 'Тип списка',
    type: 'select',
    items: [{
        id: 'numeric',
        title: 'Нумерованный'
    }, {
        id: 'marker',
        title: 'Маркерованный'
    }]
}, {
    _id: 'size',
    title: 'Размер',
    type: 'select',
    items: [{
        id: 's',
        title: 'Маленький'
    }, {
        id: 'm',
        title: 'Средний'
    }, {
        id: 'l',
        title: 'Большой'
    }]
}, {
    _id: 'width',
    title: 'Ширина',
    type: 'select',
    items: [{
        id: 'l',
        title: 'На всю ширину'
    }, {
        id: 'm',
        title: 'Среднаяя'
    }, {
        id: 's',
        title: 'Маленькая'
    }]
}, {
    _id: 'paddingBottom',
    title: 'Нижний отступ',
    type: 'select',
    items: [{
        id: 'none',
        title: 'Без отступа'
    }, {
        id: 's',
        title: 'Маленький'
    }, {
        id: 'm',
        title: 'Средний'
    }, {
        id: 'l',
        title: 'Большой'
    }]
}, {
    _id: 'paddingTop',
    title: 'Верхний отступ',
    type: 'select',
    items: [{
        id: 'none',
        title: 'Без отступа'
    }, {
        id: 's',
        title: 'Маленький'
    }, {
        id: 'm',
        title: 'Средний'
    }, {
        id: 'l',
        title: 'Большой'
    }]
}, {
    _id: 'id',
    title: 'Якорь',
    type: 'string'
}];

export const name = 'Список';
export const key = 'List';
export const defaultProps = {
    type: 'marker',
    size: 'm',
    paddingBottom: 'm',
    paddingTop: 'm',
    width: 'm',
    items: [{
        text: 'Первый элемент списка'
    }, {
        text: 'Второй элемент списка'
    }]
};
