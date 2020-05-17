export const props = [{
    _id: 'phone',
    title: 'Номер телефона',
    type: 'string'
}, {
    _id: 'email',
    title: 'Email',
    type: 'string'
}, {
    _id: 'items',
    title: 'Элементы',
    type: 'array',
    itemTitleField: 'caption',
    format: [{
        _id: 'caption',
        title: 'Текст',
        type: 'string'
    }, {
        _id: 'link',
        title: 'Ссылка',
        type: 'string'
    }]
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
    }]
}, {
    _id: 'opacity',
    title: 'Прозрачность',
    type: 'boolean'
}];

export const name = 'Шапка';
export const dependencies = ['Button'];
export const defaultProps = {
    items: [{
        caption: 'Ссылка 1',
        link: '/'
    }, {
        caption: 'Ссылка 2',
        link: '/'
    }, {
        caption: 'Ссылка 3',
        link: '/'
    }],
    phone: '89999999999',
    email: 'test@yandex.ru',
    button: {
        caption: 'Ссылка',
        link: '/'
    },
    opacity: false
};
