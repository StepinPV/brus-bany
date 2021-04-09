import { props as containerProps, defaultProps as defaultContainerProps } from './Container';

export const props = [{
    _id: 'items',
    title: 'Элементы',
    type: 'array',
    itemTitleField: 'title',
    format: [{
        _id: 'title',
        title: 'Заголовок',
        type: 'string'
    }, {
        _id: 'link',
        title: 'Ссылка',
        type: 'string'
    }]
}, {
    _id: 'width',
    title: 'Ширина',
    type: 'theme-param',
    typeId: 'max-width'
}, ...containerProps];

export const name = 'Хлебные крошки';
export const key = 'Breadcrumbs';
export const defaultProps = {
    ...defaultContainerProps,
    items: [{
        title: 'Главная',
        link: '/'
    }, {
        title: 'Текущая страница'
    }],
    width: 'm'
};
