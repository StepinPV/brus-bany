export const props = [{
    _id: 'items',
    title: 'Группы',
    type: 'array',
    itemTitleField: 'title',
    format: [{
        _id: 'title',
        title: 'Имя группы',
        type: 'string'
    }, {
        _id: 'items',
        title: 'Ссылки',
        type: 'array',
        itemTitleField: 'title',
        format: [{
            _id: 'title',
            title: 'Текст',
            type: 'string'
        }, {
            _id: 'link',
            title: 'Ссылка',
            type: 'string'
        }]
    }]
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
    _id: 'width',
    title: 'Ширина',
    type: 'theme-param',
    typeId: 'max-width'
}, {
    _id: 'id',
    title: 'Якорь',
    type: 'string'
}];

export const name = 'Ссылки';
export const key = 'Links';
export const defaultProps = {
    paddingBottom: 'm',
    paddingTop: 'm',
    width: 'm',
    items: [{
        title: 'Группа 1',
        items: [{
            title: 'Ссылка 1',
            link: '/'
        }]
    }]
};
