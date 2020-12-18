// custom
export const props = [{
    _id: 'image',
    title: 'Изображение',
    type: 'image',
    props: {
        withoutLogo: true,
        width: 400,
        globalStore: true
    }
}, {
    _id: 'imageAlt',
    title: 'Alt изображения',
    type: 'string'
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
    _id: 'height',
    title: 'Задать высоту (px)',
    type: 'integer number'
}, {
    _id: 'objectFit',
    title: 'Заполняемость',
    type: 'select',
    items: [{
        id: 'contain',
        title: 'Сохранить пропорции'
    }, {
        id: 'fill',
        title: 'Заполнить всю область'
    }, {
        id: 'cover',
        title: 'Сохранить пропорции и заполнить всю область'
    }]
}];
export const name = 'Изображение';
export const key = 'Image';
export const defaultProps = {
    paddingBottom: 'm',
    paddingTop: 'm',
    objectFit: 'contain'
};
