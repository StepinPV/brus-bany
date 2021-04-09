import { props as containerProps, defaultProps as defaultContainerProps } from './Container';

export const props = [{
    _id: 'items',
    title: 'Группы',
    type: 'array',
    itemTitleField: 'title',
    format: [{
        _id: 'title',
        title: 'Имя группы',
        type: 'string'
    }, {
        _id: 'items',
        title: 'Ссылки',
        type: 'array',
        itemTitleField: 'title',
        format: [{
            _id: 'title',
            title: 'Текст',
            type: 'string'
        }, {
            _id: 'link',
            title: 'Ссылка',
            type: 'string'
        }]
    }]
}, {
    _id: 'width',
    title: 'Ширина',
    type: 'theme-param',
    typeId: 'max-width'
}, ...containerProps];

export const name = 'Ссылки';
export const key = 'Links';
export const defaultProps = {
    ...defaultContainerProps,
    width: 'm',
    items: [{
        title: 'Группа 1',
        items: [{
            title: 'Ссылка 1',
            link: '/'
        }]
    }]
};
