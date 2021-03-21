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
