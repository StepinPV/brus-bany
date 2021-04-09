export const props = [{
    _id: 'containerBackground',
    title: 'Цвет фона',
    type: 'color-select'
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
    _id: 'id',
    title: 'Якорь',
    type: 'string'
}];

export const defaultProps = {
    paddingBottom: 'm',
    paddingTop: 'm'
};
