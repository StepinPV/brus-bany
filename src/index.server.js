import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import path from 'path';
import { ChunkExtractor } from '@loadable/server';
import createEmotionServer from 'create-emotion-server'
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/core';
import configureStore from './store';
import getRoutes from './routes';
import App from './components/App';
import axios from 'axios';

const routes = getRoutes();

const render = async (req, res, axiosOptions = {}) => {
    axios.defaults.baseURL = axiosOptions.apiURL;

    const matchRoute = routes.find(route => matchPath(req.path, route) || false);

    if (!matchRoute) {
        throw new Error(`Не найден подходящий route для ${req.url}!`);
    }

    if (!matchRoute.id) {
        throw new Error('У route не указан id!');
    }

    const store = configureStore({});

    const loadableComponent = matchRoute.component;

    const extractor = new ChunkExtractor({
        statsFile: path.resolve('public/mstatic/build/loadable-stats.json')
    });

    const component = await loadableComponent.load(extractor);

    if (component.info && component.info.id && component.info.reducer) {
        store.addReducer(component.info.id, component.info.reducer, component.info.initialState);
    }

    const wrappedComponent = component.default && component.default.WrappedComponent;

    if (wrappedComponent && wrappedComponent.initialAction) {
        await Promise.all(wrappedComponent.initialAction({
            match: matchPath(req.path, matchRoute),
            dispatch: store.dispatch,
            location: {
                pathname: req.path,
                query: req.query
            }
        }));
    }

    const context = {
        simplePage: matchRoute.simplePage
    };

    const cache = createCache();
    const { extractCritical } = createEmotionServer(cache);

    const promises = [
        axios.get(`/api/pages`),
        axios.get(`/api/page-folders`),
        axios.get(`/api/components`)
    ];

    if (matchRoute.id === 'page-generator') {
        promises.push(
            axios.get(`/api/pages/${encodeURIComponent(req.path)}`, { params: { byUrl: true } }),
            axios.get(`/api/page-templates`)
        );
    }

    const [
        pagesRes,
        pageFoldersRes,
        customComponentsRes,
        pageRes,
        pageTemplatesRes
    ] = await Promise.all(promises);

    const jsx = extractor.collectChunks(
        <CacheProvider value={cache}>
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    <App
                        preparedComponents={{ [matchRoute.id]: loadableComponent }}
                        page={pageRes ? pageRes.data.data : null}
                        customComponents={customComponentsRes.data.data}
                        pageTemplates={pageTemplatesRes ? pageTemplatesRes.data.data : null}
                        pages={pagesRes.data.data}
                        pageFolders={pageFoldersRes.data.data}
                        routes={[matchRoute]} />
                </StaticRouter>
            </Provider>
        </CacheProvider>
    );

    let { html: markup, css, ids: cssIds } = extractCritical(renderToString(jsx));

    return {
        head: Helmet.renderStatic(),
        initialData: store.getState(),
        markup,
        context,
        extractor,
        css,
        cssIds
    };
};

export { render };
