import baseLoadable from '@loadable/component';

export default (initModule) => {
    const loadable = (func) => {
        const requireSync = func.requireSync.bind(func);
        func.requireSync = (props) => {
            const module = requireSync(props);

            if (initModule) {
                initModule(module.info);
            }

            return module;
        };

        return baseLoadable(func);
    };

    return [{
        id: 'admin/pages',
        path: '/admin',
        exact: true,
        component: loadable(() => import('../admin/pages/Pages'))
    }, {
        id: 'admin/pages/page',
        path: '/admin/pages/page-:id',
        exact: true,
        component: loadable(() => import('../admin/pages/Page'))
    }, {
        id: 'admin/pages/folder',
        path: '/admin/pages/folder-:id',
        exact: true,
        component: loadable(() => import('../admin/pages/Folder'))
    }, {
        id: 'admin/pages/pages',
        path: '/admin/pages/:folderId',
        exact: true,
        component: loadable(() => import('../admin/pages/Pages'))
    }, {
        id: 'admin/components',
        path: '/admin/components',
        exact: true,
        component: loadable(() => import('../admin/pages/Components'))
    }, {
        id: 'admin/components/component',
        path: '/admin/components/:id',
        exact: true,
        component: loadable(() => import('../admin/pages/Component'))
    }, {
        id: 'admin/page-templates',
        path: '/admin/page-templates',
        exact: true,
        component: loadable(() => import('../admin/pages/PageTemplates'))
    }, {
        id: 'admin/components/page-templates/template',
        path: '/admin/page-templates/:id',
        exact: true,
        component: loadable(() => import('../admin/pages/PageTemplate'))
    }, {
        id: 'admin/settings',
        path: '/admin/settings',
        exact: true,
        component: loadable(() => import('../admin/pages/Settings'))
    }, {
        id: 'page-generator',
        path: '*',
        exact: true,
        component: loadable(() => import('../components/CustomPage')),
        simplePage: true
    }];
};
