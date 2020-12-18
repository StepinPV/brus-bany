// custom
export const props = [{
    _id: 'items',
    title: 'Шаги',
    type: 'array',
    itemTitleField: 'title',
    format: [{
        _id: 'title',
        title: 'Вопрос',
        type: 'text'
    },{
        _id: 'items',
        title: 'Ответы',
        type: 'array',
        itemTitleField: 'title',
        format: [{
            _id: 'title',
            title: 'Заголовок',
            type: 'text'
        }, {
            _id: 'image',
            title: 'Изображение',
            type: 'image',
            props: {
                withoutLogo: true,
                width: 160,
                globalStore: true
            }
        }]
    }]
}, {
    _id: 'resultText',
    title: 'Текст в конце опроса',
    type: 'text'
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
}];
export const name = 'Квиз';
export const key = 'Quiz';
export const defaultProps = {
    paddingBottom: 'm',
    paddingTop: 'm'
};
