import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import { loadableReady } from '@loadable/component';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/core';
import configureStore from './store';
import App from './components/App';
import getRoutes from './routes';
import './index.css';

if (document.readyState !== 'loading') {
    run();
} else {
    document.addEventListener('DOMContentLoaded', run);
}

async function run () {
    /* eslint-disable no-underscore-dangle */
    const store = configureStore(window.__initialData__);
    delete window.__initialData__;
    /* eslint-enable no-underscore-dangle */

    /* eslint-disable no-underscore-dangle */
    const data = window.__data__;
    delete window.__data__;
    /* eslint-enable no-underscore-dangle */

    await loadableReady();

    // TODO Вот тут не нужно добавлять все модули
    const routes = getRoutes(module => {
        if (module && module.id && module.reducer) {
            store.addReducer(module.id, module.reducer, module.initialState);
        }
    });

    const matchRoute = routes.find(route => matchPath(window.location.pathname, route) || false);

    const cache = createCache();
    ReactDOM.hydrate(
        <CacheProvider value={cache}>
            <Provider store={store}>
                <BrowserRouter>
                    <App
                        routes={[matchRoute]}
                        page={data.page}
                        customComponents={data.customComponents}
                        pageTemplates={data.pageTemplates}
                        pageFolders={data.pageFolders}
                        pages={data.pages} />
                </BrowserRouter>
            </Provider>
        </CacheProvider>,
        document.getElementById('root')
    );
}
