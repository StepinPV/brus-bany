import { props as containerProps, defaultProps as defaultContainerProps } from './Container';

export const props = [{
    _id: 'children',
    title: 'Текст',
    type: 'text'
}, {
    _id: 'color',
    title: 'Цвет',
    type: 'color-select'
}, {
    _id: 'size',
    title: 'Размер',
    type: 'theme-param',
    typeId: 'text:size'
}, {
    _id: 'align',
    title: 'Выравнивание',
    type: 'select',
    items: [{
        id: 'left',
        title: 'По левому краю'
    }, {
        id: 'center',
        title: 'По центру'
    }, {
        id: 'right',
        title: 'По правому краю'
    }]
}, ...containerProps];

export const name = 'Текст';
export const key = 'Text';
export const defaultProps = {
    ...defaultContainerProps,
    children: 'Текст',
    size: 'm',
    align: 'center'
};
