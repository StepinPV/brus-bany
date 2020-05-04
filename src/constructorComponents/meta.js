export default {
    'Caption': {
        load: () => import('./Caption'),
        loadMeta: () => import('./Caption/meta')
    },
    'Text': {
        load: () => import('./Text'),
        loadMeta: () => import('./Text/meta')
    },
    'Breadcrumbs': {
        load: () => import('./Breadcrumbs'),
        loadMeta: () => import('./Breadcrumbs/meta')
    },
    'FormBlock': {
        load: () => import('./FormBlock'),
        loadMeta: () => import('./FormBlock/meta')
    },
    'Form': {
        load: () => import('./Form'),
        loadMeta: () => import('./Form/meta')
    }
};
