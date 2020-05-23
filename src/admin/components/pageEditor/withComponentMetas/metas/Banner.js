import { props as captionProps, defaultProps as captionDefaultProps } from './Caption';
import { props as textProps, defaultProps as textDefaultProps } from './Text';
import { props as buttonProps, defaultProps as buttonDefaultProps } from './Button';

export const props = [{
    _id: 'captionProps',
    title: 'Заголовок',
    type: 'object',
    format: [...captionProps]
}, {
    _id: 'textProps',
    title: 'Текст',
    type: 'object',
    format: [...textProps]
}, {
    _id: 'buttonProps',
    title: 'Кнопка',
    type: 'object',
    format: [...buttonProps]
}, {
    _id: 'image',
    title: 'Обложка',
    props: {
        withoutLogo: true,
        globalStore: true
    },
    type: 'image'
}, {
    _id: 'id',
    title: 'Якорь',
    type: 'string'
}];

export const name = 'Обложка с заголовком, текстом и кнопкой';
export const key = 'Banner';

export const defaultProps = {
    captionProps: {
        ...captionDefaultProps,
        color: 'white',
        paddingBottom: 's',
        size: 'l'
    },
    textProps: {
        ...textDefaultProps,
        color: 'white',
        paddingTop: 's',
        size: 'l'
    },
    buttonProps: buttonDefaultProps
};
