export const props = [{
    _id: 'children',
    title: 'Текст',
    type: 'text'
}, {
    _id: 'color',
    title: 'Цвет',
    type: 'color-select'
}, {
    _id: 'background',
    title: 'Цвет фона',
    type: 'color-select'
}, {
    _id: 'size',
    title: 'Размер',
    type: 'theme-param',
    typeId: 'text:size'
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
    type: 'theme-param',
    typeId: 'padding-bottom'
}, {
    _id: 'paddingTop',
    title: 'Верхний отступ',
    type: 'theme-param',
    typeId: 'padding-top'
}, {
    _id: 'width',
    title: 'Ширина',
    type: 'theme-param',
    typeId: 'max-width'
}, {
    _id: 'id',
    title: 'Якорь',
    type: 'string'
}];

export const name = 'Текст';
export const key = 'Text';
export const defaultProps = {
    children: 'Текст',
    size: 'm',
    align: 'center',
    paddingBottom: 'm',
    paddingTop: 'm',
    isHTML: false,
    width: 'm'
};
