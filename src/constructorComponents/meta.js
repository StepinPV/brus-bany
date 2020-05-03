export default {
    'H1BlockTest': {
        load: () => import('./H1BlockTest'),
        loadMeta: () => import('./H1BlockTest/meta')
    },
    'H1BlockTest2': {
        load: () => import('./H1BlockTest2'),
        loadMeta: () => import('./H1BlockTest2/meta')
    },
    'H1BlockTest3': {
        load: () => import('./H1BlockTest3'),
        loadMeta: () => import('./H1BlockTest3/meta')
    }
};
