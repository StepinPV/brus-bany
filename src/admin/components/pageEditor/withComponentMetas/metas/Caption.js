export const props = [{
    _id: 'children',
    title: 'Заголовок',
    type: 'string'
}, {
    _id: 'color',
    title: 'Цвет',
    type: 'select',
    items: [{
        id: 'black',
        title: 'Черный'
    }, {
        id: 'white',
        title: 'Белый'
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
    _id: 'tag',
    title: 'Вид элемента',
    type: 'select',
    items: [{
        id: 'div',
        title: 'Обычный заголовок'
    }, {
        id: 'h1',
        title: 'H1 заголовок'
    }, {
        id: 'h2',
        title: 'H2 заголовок'
    }, {
        id: 'h3',
        title: 'H3 заголовок'
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
    _id: 'id',
    title: 'Якорь',
    type: 'string'
}];

export const name = 'Заголовок';
export const key = 'Caption';
export const defaultProps = {
    children: 'Заголовок',
    color: 'black',
    size: 'm',
    align: 'center',
    tag: 'div',
    paddingBottom: 'm',
    paddingTop: 'm',
    isHTML: false,
    width: 'm'
};
