import React from 'react';
import Loadable from 'react-loadable';

function Loading() {
    return <div>Loading...</div>;
}

export default (initModule) => {
    const getLoader = async (importPromise) => {
        const data = await importPromise;

        if (initModule && typeof initModule === 'function') {
            initModule(data.default);
        }

        return data.default.component;
    };

    return [{
        id: 'admin',
        path: '/admin',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../admin/pages/Admin')),
            loading: Loading,
        })
    }, {
        id: 'admin/layouts',
        path: '/admin/layouts',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../admin/pages/Layouts')),
            loading: Loading,
        })
    }, {
        id: 'admin/layouts/layout',
        path: '/admin/layouts/:id',
        exact: true,
        component: Loadable({
            loader: () => getLoader(import('../admin/pages/Layout')),
            loading: Loading,
        })
    }];
};
