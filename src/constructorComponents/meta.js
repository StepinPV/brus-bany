export default {
    'Caption': {
        load: () => import('./Caption'),
        loadMeta: () => import('./Caption/meta')
    },
    'Text': {
        load: () => import('./Text'),
        loadMeta: () => import('./Text/meta')
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
    'FormBlock': {
        load: () => import('./FormBlock'),
        loadMeta: () => import('./FormBlock/meta')
    },
    'Form': {
        load: () => import('./Form'),
        loadMeta: () => import('./Form/meta'),
        disabled: true
    }
};
