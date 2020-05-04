export const props = [{
    _id: 'items',
    title: 'Элементы',
    type: 'array',
    itemTitleField: 'title',
    format: [{
        _id: 'title',
        title: 'Заголовок',
        type: 'string'
    }, {
        _id: 'link',
        title: 'Ссылка',
        type: 'string'
    }]
}, {
    _id: 'width',
    title: 'Ширина',
    type: 'select',
    items: [{
        id: 'wide',
        title: 'Полная'
    }, {
        id: 'narrow',
        title: 'Ограниченная'
    }]
}];

export const name = 'Хлебные крошки';
export const defaultProps = {
    items: [{
        title: 'Главная',
        link: '/'
    }, {
        title: 'Текущая страница'
    }],
    width: 'narrow'
};
