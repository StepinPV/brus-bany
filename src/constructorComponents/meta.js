export default {
    'Caption': {
        load: () => import('./Caption'),
        loadMeta: () => import('./Caption/meta')
    },
    'Text': {
        load: () => import('./Text'),
        loadMeta: () => import('./Text/meta')
    },
    'Button': {
        load: () => import('./Button'),
        loadMeta: () => import('./Button/meta')
    },
    'List': {
        load: () => import('./List'),
        loadMeta: () => import('./List/meta')
    },
    'Breadcrumbs': {
        load: () => import('./Breadcrumbs'),
        loadMeta: () => import('./Breadcrumbs/meta')
    },
    'QuestionAnswer': {
        load: () => import('./QuestionAnswer'),
        loadMeta: () => import('./QuestionAnswer/meta')
    },
    'Banner': {
        load: () => import('./Banner'),
        loadMeta: () => import('./Banner/meta')
    },
    'FormBlock': {
        load: () => import('./FormBlock'),
        loadMeta: () => import('./FormBlock/meta')
    },
    'Form': {
        load: () => import('./Form'),
        loadMeta: () => import('./Form/meta'),
        disabled: true
    },
    'Contacts': {
        load: () => import('./Contacts'),
        loadMeta: () => import('./Contacts/meta')
    },
};
