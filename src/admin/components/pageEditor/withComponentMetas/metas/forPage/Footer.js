export const props = [{
    _id: 'columns',
    title: 'Столбцы',
    type: 'array',
    itemTitleField: 'caption',
    format: [{
        _id: 'caption',
        title: 'Заголовок',
        type: 'string'
    }, {
        _id: 'items',
        title: 'Ссылкы',
        type: 'array',
        format: [{
            _id: 'caption',
            title: 'Заголовок',
            type: 'string'
        }, {
            _id: 'link',
            title: 'Ссылка',
            type: 'string'
        }]
    }]
}, {
    _id: 'hasLinkToMain',
    title: 'Ссылка на главную страницу',
    type: 'boolean'
}, {
    _id: 'logo',
    title: 'Логотип',
    type: 'image',
    props: {
        allowedTypes: ['image/svg+xml', 'image/jpeg', 'image/jpeg', 'image/jpg', 'image/png']
    }
}, {
    _id: 'socialNetworks',
    title: 'Социальные сети',
    type: 'object',
    format: [{
        _id: 'vk',
        title: 'ВК',
        type: 'string'
    }, {
        _id: 'fb',
        title: 'Facebook',
        type: 'string'
    }, {
        _id: 'ok',
        title: 'Одноклассники',
        type: 'string'
    }, {
        _id: 'inst',
        title: 'Instagram',
        type: 'string'
    }, {
        _id: 'youtube',
        title: 'Youtube',
        type: 'string'
    }]
}, {
    _id: 'additional',
    title: 'Дополнительная информация',
    type: 'text'
}];

export const name = 'Подвал';
export const key = 'Footer';
export const defaultProps = {
    columns: [{
        caption: 'Столбец 1',
        items: [{
            caption: 'Ссылка 1',
            link: '/'
        }, {
            caption: 'Ссылка 2',
            link: '/'
        }, {
            caption: 'Ссылка 3',
            link: '/'
        }]
    }, {
        caption: 'Столбец 2',
        items: [{
            caption: 'Ссылка 1',
            link: '/'
        }, {
            caption: 'Ссылка 2',
            link: '/'
        }, {
            caption: 'Ссылка 3',
            link: '/'
        }]
    }, {
        caption: 'Столбец 3',
        items: [{
            caption: 'Ссылка 1',
            link: '/'
        }, {
            caption: 'Ссылка 2',
            link: '/'
        }, {
            caption: 'Ссылка 3',
            link: '/'
        }]
    }],
    hasLinkToMain: true
};
