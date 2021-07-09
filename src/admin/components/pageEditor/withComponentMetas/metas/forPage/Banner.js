export const props = [{
    _id: 'caption',
    title: 'Заголовок',
    type: 'text'
}, {
    _id: 'text',
    title: 'Текст',
    type: 'text'
}, {
    _id: 'button',
    title: 'Кнопка',
    type: 'object',
    format: [{
        _id: 'caption',
        title: 'Текст',
        type: 'string'
    }, {
        _id: 'link',
        title: 'Ссылка',
        type: 'string'
    }, {
        _id: 'color',
        title: 'Цвет текста',
        type: 'color-select'
    }, {
        _id: 'background',
        title: 'Цвет фона',
        type: 'color-select'
    },]
}, {
    _id: 'button2',
    title: 'Кнопка 2',
    type: 'object',
    format: [{
        _id: 'caption',
        title: 'Текст',
        type: 'string'
    }, {
        _id: 'link',
        title: 'Ссылка',
        type: 'string'
    }, {
        _id: 'color',
        title: 'Цвет текста',
        type: 'color-select'
    }, {
        _id: 'background',
        title: 'Цвет фона',
        type: 'color-select'
    },]
}, {
    _id: 'image',
    title: 'Обложка',
    props: {
        withoutLogo: true,
        withoutCompression: true
    },
    type: 'image'
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
    _id: 'overlay',
    title: 'Затемнение',
    type: 'boolean',
}, {
    _id: 'id',
    title: 'Якорь',
    type: 'string'
}];

export const name = 'Обложка с заголовком, текстом и кнопкой';
export const key = 'Banner';

export const defaultProps = {
    caption: 'Заголовок',
    text: 'Описание раздела',
    buttonCaption: 'Текст кнопки',
    align: 'center',
    overlay: true
};
