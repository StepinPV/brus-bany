export const props = [{
    _id: 'caption',
    title: 'Заголовок',
    type: 'string'
}, {
    _id: 'text',
    title: 'Текст',
    type: 'text'
}, {
    _id: 'buttonCaption',
    title: 'Текст кнопки',
    type: 'string'
}, {
    _id: 'buttonLink',
    title: 'Ссылка',
    type: 'string'
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

export const name = 'Обложка с заголовком, текстом и кнопкой';
export const key = 'Banner';

export const defaultProps = {
    caption: 'Заголовок',
    text: 'Описание раздела',
    buttonCaption: 'Текст кнопки'
};
