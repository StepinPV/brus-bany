import Loadable from 'react-loadable';
import LoaderPage from '../components/LoaderPage';

export default (initModule) => {
    const getLoader = async (importPromise) => {
        const data = await importPromise;

        if (initModule && typeof initModule === 'function') {
            await initModule(data.default);
        }

        return data.default.component || data.default;
    };

    return [{
        id: 'bani/main',
        path: '/',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Main')),
            loading: LoaderPage,
        })
    }, {
        id: 'bani/category',
        path: '/bani/:categoryId/:layoutId\\_:weight(\\d+)x:length(\\d+)',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Project')),
            loading: LoaderPage,
        })
    }, {
        id: 'bani/category',
        path: '/bani/:id',
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Category')),
            loading: LoaderPage,
        })
    }, {
        id: 'bani/requisites',
        path: '/rekvizity',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Requisites')),
            loading: LoaderPage,
        })
    }, {
        id: 'bani/payment',
        path: '/uslovia-oplati',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Payment')),
            loading: LoaderPage,
        })
    }, {
        id: 'bani/jobs',
        path: '/vakansii',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Jobs')),
            loading: LoaderPage,
        })
    }, {
        id: 'bani/privacy',
        path: '/politika_konfidencialnosty',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Privacy')),
            loading: LoaderPage,
        })
    }, {
        id: 'bani/delivery',
        path: '/dostavka',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Delivery')),
            loading: LoaderPage,
        })
    }, {
        id: 'bani/contacts',
        path: '/contakti',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Contacts')),
            loading: LoaderPage,
        })
    }, {
        id: 'bani/custom-project',
        path: '/individualniy-proekt',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/CustomProject')),
            loading: LoaderPage,
        })
    }, {
        id: 'bani/feedback',
        path: '/otzivi',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Feedback')),
            loading: LoaderPage,
        })
    }, {
        id: 'bani/promo',
        path: '/akcii',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Promo')),
            loading: LoaderPage,
        })
    }, {
        id: 'bani/questions',
        path: '/voprosy-i-otvety',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Questions')),
            loading: LoaderPage,
        })
    }, {
        id: 'bani/gosty-i-snipy',
        path: '/gosty-i-snipy',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/GOST')),
            loading: LoaderPage,
        })
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
        path: '/admin/layouts/:id',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../admin/pages/Layout')),
            loading: LoaderPage,
        })
    }, {
        id: 'admin/materials',
        path: '/admin/materials',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../admin/pages/Materials')),
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
        path: '/admin/categories/:id',
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
        id: 'not-found',
        path: '*',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/NotFound')),
            loading: LoaderPage,
        })
    }];
};
