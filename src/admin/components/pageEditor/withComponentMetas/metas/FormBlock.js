// custom
export const props = [{
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
    _id: 'background',
    title: 'Цвет блока',
    type: 'color-select'
}, {
    _id: 'image',
    title: 'Изображение',
    type: 'image',
    props: {
        withoutLogo: true,
        width: 580,
        globalStore: true
    }
}];
export const name = 'Блок с изображением и формой';
export const key = 'FormBlock';
export const defaultProps = {
    paddingBottom: 'm',
    paddingTop: 'm'
};
