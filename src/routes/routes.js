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
        id: 'bani/custom-project',
        path: '/bani/individualniy-proekt',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/CustomProject')),
            loading: LoaderPage,
        })
    }, {
        id: 'bani/category',
        path: '/bani/:categoryName/:layoutName\\_:weight([\\d|\\.]+)x:length([\\d|\\.]+)',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Project')),
            loading: LoaderPage,
        })
    }, {
        id: 'bani/category',
        path: '/bani/:name',
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
        id: 'bani/promo',
        path: '/akcii/quiz',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Promo/resources/Quiz')),
            loading: LoaderPage,
        })
    }, {
        id: 'bani/about-company',
        path: '/about-company',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/AboutCompany')),
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
        id: 'bani/articles',
        path: '/blog',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Articles')),
            loading: LoaderPage,
        })
    }, {
        id: 'bani/article',
        path: '/blog/:name',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Article')),
            loading: LoaderPage,
        })
    }, {
        id: 'bani/photos',
        path: '/photos',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Photos')),
            loading: LoaderPage,
        })
    }, {
        id: 'bani/photos',
        path: '/photos/:categoryName',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/PhotosCategory')),
            loading: LoaderPage,
        })
    }, {
        id: 'bani/photos',
        path: '/photos/:categoryName/:layoutName\\_:weight([\\d|\\.]+)x:length([\\d|\\.]+)_:photoId',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/Photo')),
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
        path: '/admin/layouts/:name',
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
        id: 'not-found',
        path: '*',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../client/pages/NotFound')),
            loading: LoaderPage,
        })
    }];
};
