// custom
export const props = [{
    _id: 'image',
    title: 'Изображение',
    type: 'image',
    props: {
        withoutLogo: true,
        width: 740,
        globalStore: true
    }
}, {
    _id: 'imageAlt',
    title: 'Alt изображения',
    type: 'string'
}, {
    _id: 'height',
    title: 'Задать высоту (px)',
    type: 'integer number'
}, {
    _id: 'height-width',
    title: 'Задать отношение высоты к ширине (%)',
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
}, {
    _id: 'sticker',
    title: 'Стикер',
    type: 'object',
    format: [{
        _id: 'condition',
        title: 'Флаг показа',
        type: 'string'
    }, {
        _id: 'text',
        title: 'Стикер',
        type: 'string'
    }]
}];
export const name = 'Изображение';
export const key = 'Image';
export const defaultProps = {
    objectFit: 'contain'
};
