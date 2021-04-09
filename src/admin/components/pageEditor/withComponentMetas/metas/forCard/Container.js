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
    _id: 'stretched',
    title: 'Блок растягивается по высоте',
    type: 'boolean'
}];

export const defaultProps = {
    paddingBottom: 'm',
    paddingTop: 'm'
};
