import { props as captionProps, defaultProps as captionDefaultProps } from '../Caption/meta';
import { props as textProps, defaultProps as textDefaultProps } from '../Text/meta';

export const props = [{
    _id: 'captionProps',
    title: 'Заголовок',
    type: 'object',
    format: [...captionProps]
}, {
    _id: 'textProps',
    title: 'Заголовок',
    type: 'object',
    format: [...textProps]
}, {
    _id: 'button',
    title: 'Кнопка',
    type: 'object',
    format: [{
        _id: 'caption',
        title: 'Заголовок',
        type: 'string'
    }, {
        _id: 'href',
        title: 'Ссылка',
        type: 'string'
    }]
}, {
    _id: 'image',
    title: 'Обложка',
    props: {
        withoutLogo: true,
        globalStore: true
    },
    type: 'image'
}];

export const name = 'Обложка с заголовком, текстом и кнопкой';

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
    button: {
        href: '/',
        caption: 'Кнопка-ссылка'
    }
};

export const dependencies = ['Caption', 'Text'];
