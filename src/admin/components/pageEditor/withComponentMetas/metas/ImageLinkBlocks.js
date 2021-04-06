// custom
export const props = [{
    _id: 'items',
    title: 'Элементы',
    type: 'array',
    format: [{
        _id: 'title',
        title: 'Заголовок',
        type: 'string'
    }, {
        _id: 'buttonTitle',
        title: 'Текст кнопки',
        type: 'string'
    }, {
        _id: 'link',
        title: 'Ссылка',
        type: 'string'
    }, {
        _id: 'image',
        title: 'Изображение',
        type: 'image',
        props: {
            withoutLogo: true,
            width: 800,
            globalStore: true,
            withoutCompression: true
        }
    }]
},{
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
export const name = 'Блоки с изображением, заголовками и ссылкой';
export const key = 'ImageLinkBlocks';
export const defaultProps = {
    paddingBottom: 'm',
    paddingTop: 'm',
    items: []
};
