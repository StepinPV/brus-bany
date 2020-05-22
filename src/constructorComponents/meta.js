import loadable from '@loadable/component';

export const Caption = loadable(() => import('./Caption'));
export const Text = loadable(() => import('./Text'));
export const Button = loadable(() => import('./Button'));
export const List = loadable(() => import('./List'));
export const Breadcrumbs = loadable(() => import('./Breadcrumbs'));
export const QuestionAnswer = loadable(() => import('./QuestionAnswer'));
export const Banner = loadable(() => import('./Banner'));
export const Header = loadable(() => import('./Header'));
export const Footer = loadable(() => import('./Footer'));
export const FormBlock = loadable(() => import('./FormBlock'));
export const Form = loadable(() => import('./Form'));
export const Contacts = loadable(() => import('./Contacts'));
export const ImageLinkBlock = loadable(() => import('./ImageLinkBlock'));
export const Quiz = loadable(() => import('./Quiz'));

export default {
    'Caption': {
        loadMeta: () => import('./Caption/meta')
    },
    'Text': {
        loadMeta: () => import('./Text/meta')
    },
    'Button': {
        loadMeta: () => import('./Button/meta')
    },
    'List': {
        loadMeta: () => import('./List/meta')
    },
    'Breadcrumbs': {
        loadMeta: () => import('./Breadcrumbs/meta')
    },
    'QuestionAnswer': {
        loadMeta: () => import('./QuestionAnswer/meta')
    },
    'Banner': {
        loadMeta: () => import('./Banner/meta')
    },
    'Header': {
        loadMeta: () => import('./Header/meta')
    },
    'Footer': {
        loadMeta: () => import('./Footer/meta')
    },
    'FormBlock': {
        loadMeta: () => import('./FormBlock/meta')
    },
    'Form': {
        loadMeta: () => import('./Form/meta')
    },
    'Contacts': {
        loadMeta: () => import('./Contacts/meta')
    },
    'ImageLinkBlock': {
        loadMeta: () => import('./ImageLinkBlock/meta')
    },
    'Quiz': {
        loadMeta: () => import('./Quiz/meta')
    },
};
