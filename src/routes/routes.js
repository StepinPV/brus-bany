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
        id: 'site/main',
        path: '/',
        exact: true,
        component: loadable(() => import('../client/pages/Main')),
        simplePage: true
    }, {
        id: 'site/bani/category/project',
        path: '/bani/:categoryName/:layoutName\\_:width([\\d|\\.]+)x:length([\\d|\\.]+)',
        exact: true,
        component: loadable(() => import('../client/pages/Project'))
    }, {
        id: 'site/bani/category',
        path: '/bani/:name',
        component: loadable(() => import('../client/pages/Category')),
        simplePage: true
    }, {
        id: 'site/doma-iz-brusa/project',
        path: '/doma-iz-brusa/:layoutName\\_:width([\\d|\\.]+)x:length([\\d|\\.]+)',
        exact: true,
        component: loadable(() => import('../client/pages/Project'))
    }, {
        id: 'site/doma-iz-brusa',
        path: '/doma-iz-brusa',
        component: loadable(() => import('../client/pages/Category'))
    }, {
        id: 'site/photos',
        path: '/photos',
        exact: true,
        component: loadable(() => import('../client/pages/Photos')),
        simplePage: true
    }, {
        id: 'site/photos/category',
        path: '/photos/:name',
        exact: true,
        component: loadable(() => import('../client/pages/Photos')),
        simplePage: true
    }, {
        id: 'site/photos/category/project',
        path: '/photos/:categoryName/:layoutName\\_:width([\\d|\\.]+)x:length([\\d|\\.]+)_:photoId',
        exact: true,
        component: loadable(() => import('../client/pages/Photo')),
        simplePage: true
    }, {
        id: 'admin',
        path: '/admin',
        exact: true,
        component: loadable(() => import('../admin/pages/Admin'))
    }, {
        id: 'admin/layouts',
        path: '/admin/layouts',
        exact: true,
        component: loadable(() => import('../admin/pages/Layouts'))
    }, {
        id: 'admin/layouts/layout',
        path: '/admin/layouts/:name',
        exact: true,
        component: loadable(() => import('../admin/pages/Layout'))
    }, {
        id: 'admin/categories',
        path: '/admin/categories',
        exact: true,
        component: loadable(() => import('../admin/pages/Categories'))
    }, {
        id: 'admin/categories/category',
        path: '/admin/categories/:name',
        exact: true,
        component: loadable(() => import('../admin/pages/Category'))
    }, {
        id: 'admin/projects',
        path: '/admin/projects',
        exact: true,
        component: loadable(() => import('../admin/pages/Projects'))
    }, {
        id: 'admin/projects/category/project',
        path: '/admin/projects/:categoryId/:layoutId',
        exact: true,
        component: loadable(() => import('../admin/pages/Project'))
    }, {
        id: 'admin/photos',
        path: '/admin/photos',
        exact: true,
        component: loadable(() => import('../admin/pages/Photos'))
    }, {
        id: 'admin/photos',
        path: '/admin/photos/:categoryId/:id',
        exact: true,
        component: loadable(() => import('../admin/pages/Photo'))
    }, {
        id: 'admin/pages',
        path: '/admin/pages',
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
        id: 'page-generator',
        path: '*',
        exact: true,
        component: loadable(() => import('../client/pages/CustomPage')),
        simplePage: true
    }];
};
