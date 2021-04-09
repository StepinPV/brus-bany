import { props as containerProps, defaultProps as defaultContainerProps } from './Container';

export const props = [{
    _id: 'children',
    title: 'Заголовок',
    type: 'text',
    props: {
        withoutEditor: true
    }
}, {
    _id: 'color',
    title: 'Цвет',
    type: 'color-select'
}, {
    _id: 'size',
    title: 'Размер',
    type: 'theme-param',
    typeId: 'caption:size'
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

export const name = 'Заголовок';
export const key = 'Caption';
export const defaultProps = {
    ...defaultContainerProps,
    children: 'Заголовок',
    size: 'm',
    align: 'center'
};
