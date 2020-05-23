import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import path from 'path';
import { ChunkExtractor } from '@loadable/server';
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

    let page = null;
    let customComponents;

    if (matchRoute.id === 'page-generator') {
        const pageRes = await axios.get(`/api/pages/${encodeURIComponent(req.path)}`, {
            params: {
                byUrl: true
            }
        });

        const customComponentsRes = await axios.get(`/api/components`);

        if (pageRes.data && pageRes.data.status === 'success' && pageRes.data.data) {
            page = pageRes.data.data;
            customComponents = customComponentsRes.data.data;
        }
    }

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

    const jsx = extractor.collectChunks(
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <App
                    preparedComponents={{ [matchRoute.id]: loadableComponent }}
                    page={page}
                    customComponents={customComponents}
                    routes={[matchRoute]} />
            </StaticRouter>
        </Provider>
    );

    const markup = ReactDOMServer.renderToString(jsx);

    return {
        head: Helmet.renderStatic(),
        initialData: store.getState(),
        pageData: page,
        // TODO Не нужно передавать все!
        customComponents,
        markup,
        context,
        extractor
    };
};

export { render };
