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
    _id: 'caption',
    title: 'Заголовок',
    type: 'string'
}, {
    _id: 'text',
    title: 'Текст',
    type: 'text'
}, {
    _id: 'buttonCaption',
    title: 'Текст кнопки',
    type: 'string'
}, {
    _id: 'buttonHref',
    title: 'Ссылка',
    type: 'string'
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
}];
export const name = 'Блок с изображением, описанием и ссылкой';
export const key = 'ImageLinkBlock';
export const defaultProps = {
    paddingBottom: 'm',
    paddingTop: 'm',
    caption: 'Заголовок',
    text: 'Текст',
    buttonCaption: 'Заголовок'
};
