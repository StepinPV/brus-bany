export const props = [{
    _id: 'items',
    title: 'Элементы',
    type: 'array',
    itemTitleField: 'title',
    format: [{
        _id: 'title',
        title: 'Заголовок',
        type: 'text',
        props: {
            withoutEditor: true
        }
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
        id: 'l',
        title: 'На всю ширину'
    }, {
        id: 'm',
        title: 'Среднаяя'
    }, {
        id: 's',
        title: 'Маленькая'
    }]
}];

export const name = 'Хлебные крошки';
export const key = 'Breadcrumbs';
export const defaultProps = {
    items: [{
        title: 'Главная',
        link: '/'
    }, {
        title: 'Текущая страница'
    }],
    width: 'm'
};
