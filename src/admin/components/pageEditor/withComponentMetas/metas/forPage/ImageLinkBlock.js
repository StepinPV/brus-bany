import { props as containerProps, defaultProps as defaultContainerProps } from './Container';

// custom
export const props = [{
    _id: 'image',
    title: 'Изображение',
    type: 'image',
    props: {
        withoutLogo: true,
        width: 800,
        globalStore: true
    }
}, {
    _id: 'imageAlt',
    title: 'Alt изображения',
    type: 'string'
}, {
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
    _id: 'buttonHref',
    title: 'Ссылка',
    type: 'string'
}, ...containerProps];
export const name = 'Блок с изображением, описанием и ссылкой';
export const key = 'ImageLinkBlock';
export const defaultProps = {
    ...defaultContainerProps,
    caption: 'Заголовок',
    text: 'Текст',
    buttonCaption: 'Заголовок'
};
