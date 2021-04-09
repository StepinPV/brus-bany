import { props as containerProps, defaultProps as defaultContainerProps } from './Container';

export const props = [{
    _id: 'link',
    title: 'Ссылка',
    type: 'string'
}, {
    _id: 'title',
    title: 'SEO Title',
    type: 'string'
}, {
    _id: 'height',
    title: 'Высота (px)',
    type: 'integer number'
}, {
    _id: 'width',
    title: 'Ширина',
    type: 'theme-param',
    typeId: 'max-width'
}, ...containerProps];

export const name = 'Iframe';
export const key = 'Iframe';
export const defaultProps = {
    ...defaultContainerProps,
    width: 'm'
};
