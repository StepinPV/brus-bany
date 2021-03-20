// custom
export const props = [{
    _id: 'images',
    title: 'Изображения',
    type: 'array',
    itemTitleField: 'alt',
    format: [{
        _id: 'src',
        title: 'Изображение',
        type: 'image',
        props: {
            withoutLogo: true,
            width: 1200,
            globalStore: true,
            withoutCompression: true
        }
    }, {
        _id: 'alt',
        title: 'Alt изображения',
        type: 'string'
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
export const name = 'Плитка изображений';
export const key = 'ImageTiles';
export const defaultProps = {
    paddingBottom: 'm',
    paddingTop: 'm',
    images: []
};
