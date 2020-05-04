export const props = [{
    _id: 'children',
    title: 'Текст',
    type: 'text'
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
    _id: 'align',
    title: 'Выравнивание',
    type: 'select',
    items: [{
        id: 'left',
        title: 'По левому краю'
    }, {
        id: 'center',
        title: 'По центру'
    }, {
        id: 'right',
        title: 'По правому краю'
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
    _id: 'isHTML',
    title: 'HTML в качестве значения',
    type: 'boolean'
}, {
    _id: 'width',
    title: 'Ширина',
    type: 'select',
    items: [{
        id: 'wide',
        title: 'Полная'
    }, {
        id: 'narrow',
        title: 'Ограниченная'
    }]
}];

export const name = 'Текст';
export const defaultProps = {
    children: 'Текст',
    size: 'm',
    align: 'center',
    paddingBottom: 'm',
    paddingTop: 'm',
    isHTML: false,
    width: 'narrow'
};
