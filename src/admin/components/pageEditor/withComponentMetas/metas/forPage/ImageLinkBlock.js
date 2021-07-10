import { props as containerProps, defaultProps as defaultContainerProps } from './Container';

// custom
export const props = [{
    _id: 'image',
    title: 'Изображение',
    type: 'image',
    props: {
        withoutLogo: true,
        width: 800
    }
}, {
    _id: 'imageAlt',
    title: 'Alt изображения',
    type: 'string'
}, {
    _id: 'caption',
    title: 'Заголовок',
    type: 'text'
}, {
    _id: 'text',
    title: 'Текст',
    type: 'text'
}, {
    _id: 'button',
    title: 'Кнопка',
    type: 'object',
    format: [{
        _id: 'caption',
        title: 'Текст',
        type: 'string'
    }, {
        _id: 'link',
        title: 'Ссылка',
        type: 'string'
    }, {
        _id: 'color',
        title: 'Цвет текста',
        type: 'color-select'
    }, {
        _id: 'background',
        title: 'Цвет фона',
        type: 'color-select'
    },]
}, ...containerProps];
export const name = 'Блок с изображением, описанием и ссылкой';
export const key = 'ImageLinkBlock';
export const defaultProps = {
    ...defaultContainerProps,
    caption: 'Заголовок',
    text: 'Текст',
    buttonCaption: 'Заголовок'
};
