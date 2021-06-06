import { props as containerProps, defaultProps as defaultContainerProps } from './Container';

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
            width: 1200
        }
    }, {
        _id: 'alt',
        title: 'Alt изображения',
        type: 'string'
    }]
}, {
    _id: 'title',
    title: 'Заголовок',
    type: 'text'
}, {
    _id: 'description',
    title: 'Описание',
    type: 'text'
}, {
    _id: 'price',
    title: 'Цена',
    type: 'string'
}, {
    _id: 'firstButton',
    title: 'Первая кнопка',
    type: 'object',
    format: [{
        _id: 'caption',
        title: 'Заголовок',
        type: 'string',
    }, {
        _id: 'formCaption',
        title: 'Заголовок формы',
        type: 'string',
    }]
}, {
    _id: 'secondButton',
    title: 'Вторая кнопка',
    type: 'object',
    format: [{
        _id: 'caption',
        title: 'Заголовок',
        type: 'string',
    }, {
        _id: 'formCaption',
        title: 'Заголовок формы',
        type: 'string',
    }]
}, {
    _id: 'additionalInfo',
    title: 'Дополнительное описание',
    type: 'text'
}, ...containerProps];
export const name = 'Карточка проекта с галереей';
export const key = 'ProductCard';
export const defaultProps = {
    ...defaultContainerProps,
    title: 'Заголовок',
    description: 'Описание',
    price: '1000',
    firstButton: {
        caption: 'Первая кнопка',
        formCaption: 'Заголовок формы'
    },
    secondButton: {
        caption: 'Вторая кнопка',
        formCaption: 'Заголовок формы'
    }
};
