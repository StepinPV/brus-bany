import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, matchPath } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import App from './components/App';
import routes from './routes';
import './index.css';

if (document.readyState !== 'loading') {
    run();
} else {
    document.addEventListener('DOMContentLoaded', run);
}

async function run () {
    /* eslint-disable no-underscore-dangle */
    const data = window.__data__;
    delete window.__data__;
    /* eslint-enable no-underscore-dangle */

    /* eslint-disable no-underscore-dangle */
    const theme = window.__theme__;
    delete window.__theme__;
    /* eslint-enable no-underscore-dangle */

    await loadableReady();

    const matchRoute = routes.find(route => matchPath(window.location.pathname, route) || false);

    const cache = createCache({ key: 'custom' });

    ReactDOM.hydrate(
        <CacheProvider value={cache}>
            <BrowserRouter>
                <App
                    theme={theme}
                    routes={[matchRoute]}
                    page={data.page}
                    customComponents={data.customComponents}
                    pageTemplates={data.pageTemplates}
                    pageFolders={data.pageFolders}
                    pages={data.pages} />
            </BrowserRouter>
        </CacheProvider>,
        document.getElementById('root')
    );
}
