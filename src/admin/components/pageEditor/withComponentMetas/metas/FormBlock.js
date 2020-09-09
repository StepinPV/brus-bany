// custom
export const props = [{
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
