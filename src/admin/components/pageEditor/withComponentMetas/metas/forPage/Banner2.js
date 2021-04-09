export const props = [{
    _id: 'caption',
    title: 'Заголовок',
    type: 'string'
}, {
    _id: 'text',
    title: 'Текст',
    type: 'string'
}, {
    _id: 'firstButton',
    title: 'Первая кнопка',
    type: 'object',
    format: [{
        _id: 'title',
        title: 'Заголовок',
        type: 'string',
    }, {
        _id: 'href',
        title: 'Ссылка',
        type: 'string',
    }]
}, {
    _id: 'secondButton',
    title: 'Вторая кнопка',
    type: 'object',
    format: [{
        _id: 'title',
        title: 'Заголовок',
        type: 'string',
    }, {
        _id: 'href',
        title: 'Ссылка',
        type: 'string',
    }]
}, {
    _id: 'image',
    title: 'Обложка',
    props: {
        withoutLogo: true,
        globalStore: true
    },
    type: 'image'
}, {
    _id: 'id',
    title: 'Якорь',
    type: 'string'
}];

export const name = 'Обложка с заголовком, текстом и двумя кнопками';
export const key = 'Banner2';

export const defaultProps = {
    caption: 'Заголовок',
    text: 'Описание',
    firstButton: {
        title: 'Первая кнопка',
        href: '/'
    },
    secondButton: {
        title: 'Вторая кнопка',
        href: '/'
    }
};
