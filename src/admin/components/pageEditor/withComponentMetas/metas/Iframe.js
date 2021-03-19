export const props = [{
    _id: 'link',
    title: 'Ссылка',
    type: 'string'
}, {
    _id: 'title',
    title: 'SEO Title',
    type: 'string'
}, {
    _id: 'height',
    title: 'Высота (px)',
    type: 'integer number'
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

export const name = 'Iframe';
export const key = 'Iframe';
export const defaultProps = {
    paddingBottom: 'm',
    paddingTop: 'm',
    width: 'm'
};
