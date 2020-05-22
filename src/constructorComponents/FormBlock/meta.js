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
    type: 'select',
    items: [{
        id: 'white',
        title: 'Белый'
    }, {
        id: 'grey',
        title: 'Серый'
    }]
}];
export const name = 'Блок с изображением и формой';
export const defaultProps = {
    background: 'grey',
    paddingBottom: 'm',
    paddingTop: 'm'
};
