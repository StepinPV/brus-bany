import { props as containerProps, defaultProps as defaultContainerProps } from './Container';

// custom
export const props = [{
    _id: 'items',
    title: 'Элементы',
    type: 'array',
    format: [{
        _id: 'icon',
        title: 'Логотип',
        type: 'image',
        props: {
            allowedTypes: ['image/svg+xml', 'image/jpeg', 'image/jpeg', 'image/jpg', 'image/png']
        }
    }, {
        _id: 'caption',
        title: 'Заголовок',
        type: 'text'
    }, {
        _id: 'text',
        title: 'Текст',
        type: 'text'
    }]
}, {
    _id: 'hasArrows',
    title: 'Стрелки',
    type: 'boolean'
},...containerProps];
export const name = 'Как мы работаем';
export const key = 'HowWork';
export const defaultProps = {
    ...defaultContainerProps,
    hasArrows: false
};
