import { props as containerProps, defaultProps as defaultContainerProps } from './Container';

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
        _id: 'link',
        title: 'Ссылка',
        type: 'string'
    }, {
        _id: 'button',
        title: 'Кнопка',
        type: 'object',
        format: [{
            _id: 'caption',
            title: 'Текст',
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
    }, {
        _id: 'image',
        title: 'Изображение',
        type: 'image',
        props: {
            withoutLogo: true,
            width: 800
        }
    }]
}, ...containerProps];
export const name = 'Блоки с изображением, заголовками и ссылкой';
export const key = 'ImageLinkBlocks';
export const defaultProps = {
    ...defaultContainerProps,
    items: []
};
