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
        id: 'site/bani/custom-project',
        path: '/bani/individualnyy-proekt',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/CustomProject')),
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
        id: 'site/requisites',
        path: '/rekvizity',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Requisites')),
            loading: LoaderPage,
        }),
        simplePage: true
    }, {
        id: 'site/payment',
        path: '/usloviya-oplaty',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Payment')),
            loading: LoaderPage,
        }),
        simplePage: true
    }, {
        id: 'site/jobs',
        path: '/vakansii',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Jobs')),
            loading: LoaderPage,
        }),
        simplePage: true
    }, {
        id: 'site/privacy',
        path: '/politika-konfidencialnosti',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Privacy')),
            loading: LoaderPage,
        }),
        simplePage: true
    }, {
        id: 'site/delivery',
        path: '/dostavka',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Delivery')),
            loading: LoaderPage,
        })
    }, {
        id: 'site/contacts',
        path: '/kontakty',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Contacts')),
            loading: LoaderPage,
        })
    }, {
        id: 'site/promo',
        path: '/akcii',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Promo')),
            loading: LoaderPage,
        }),
        simplePage: true
    }, {
        id: 'site/promo/quiz',
        path: '/akcii/quiz',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Promo/resources/Quiz')),
            loading: LoaderPage,
        })
    }, {
        id: 'site/o-companii',
        path: '/o-companii',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/AboutCompany')),
            loading: LoaderPage,
        }),
        simplePage: true
    }, {
        id: 'site/questions',
        path: '/voprosy-i-otvety',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Questions')),
            loading: LoaderPage,
        }),
        simplePage: true
    }, {
        id: 'site/gosty-i-snipy',
        path: '/gosty-i-snipy',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/GOST')),
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
        id: 'site/thanks',
        path: '/thanks',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Thanks')),
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
        }),
        simplePage: true
    }];
};
