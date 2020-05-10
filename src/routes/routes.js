import Loadable from 'react-loadable';
import LoaderPage from '../components/LoaderPage';

export default (initModule) => {
    const getLoader = async (importPromise) => {
        const module = await importPromise;

        if (initModule && typeof initModule === 'function') {
            initModule(module.info);
        }

        return module;
    };

    return [{
        id: 'site/main',
        path: '/',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Main')),
            loading: LoaderPage,
        }),
        simplePage: true
    }, {
        id: 'site/bani',
        path: '/bani',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Categories')),
            loading: LoaderPage,
        }),
        simplePage: true
    }, {
        id: 'site/bani/category/project',
        path: '/bani/:categoryName/:layoutName\\_:width([\\d|\\.]+)x:length([\\d|\\.]+)',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Project')),
            loading: LoaderPage,
        })
    }, {
        id: 'site/bani/category',
        path: '/bani/:name',
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Category')),
            loading: LoaderPage,
        }),
        simplePage: true
    }, {
        id: 'site/blog',
        path: '/blog',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Articles')),
            loading: LoaderPage,
        }),
        simplePage: true
    }, {
        id: 'site/blog/article',
        path: '/blog/:name',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Article')),
            loading: LoaderPage,
        }),
        simplePage: true
    }, {
        id: 'site/photos',
        path: '/photos',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Photos')),
            loading: LoaderPage,
        }),
        simplePage: true
    }, {
        id: 'site/photos/category',
        path: '/photos/:name',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Photos')),
            loading: LoaderPage,
        }),
        simplePage: true
    }, {
        id: 'site/photos/category/project',
        path: '/photos/:categoryName/:layoutName\\_:width([\\d|\\.]+)x:length([\\d|\\.]+)_:photoId',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Photo')),
            loading: LoaderPage,
        }),
        simplePage: true
    }, {
        id: 'admin',
        path: '/admin',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../admin/pages/Admin')),
            loading: LoaderPage,
        })
    }, {
        id: 'admin/layouts',
        path: '/admin/layouts',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../admin/pages/Layouts')),
            loading: LoaderPage,
        })
    }, {
        id: 'admin/layouts/layout',
        path: '/admin/layouts/:name',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../admin/pages/Layout')),
            loading: LoaderPage,
        })
    }, {
        id: 'admin/categories',
        path: '/admin/categories',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../admin/pages/Categories')),
            loading: LoaderPage,
        })
    }, {
        id: 'admin/categories/category',
        path: '/admin/categories/:name',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../admin/pages/Category')),
            loading: LoaderPage,
        })
    }, {
        id: 'admin/projects',
        path: '/admin/projects',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../admin/pages/Projects')),
            loading: LoaderPage,
        })
    }, {
        id: 'admin/projects/category/project',
        path: '/admin/projects/:categoryId/:layoutId',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../admin/pages/Project')),
            loading: LoaderPage,
        })
    }, {
        id: 'admin/articles',
        path: '/admin/articles',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../admin/pages/Articles')),
            loading: LoaderPage,
        })
    }, {
        id: 'admin/articles/article',
        path: '/admin/articles/:name',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../admin/pages/Article')),
            loading: LoaderPage,
        })
    }, {
        id: 'admin/photos',
        path: '/admin/photos',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../admin/pages/Photos')),
            loading: LoaderPage,
        })
    }, {
        id: 'admin/photos',
        path: '/admin/photos/:categoryId/:id',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../admin/pages/Photo')),
            loading: LoaderPage,
        })
    }, {
        id: 'admin/pages',
        path: '/admin/pages',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../admin/pages/Pages')),
            loading: LoaderPage,
        })
    }, {
        id: 'admin/pages/page',
        path: '/admin/pages/:id',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../admin/pages/Page')),
            loading: LoaderPage,
        })
    }, {
        id: 'page-generator',
        path: '*',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/CustomPage')),
            loading: LoaderPage,
        })
    }];
};
