import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import Loadable from 'react-loadable';
import configureStore from './store';
import getRoutes from './routes';
import App from './components/App';
import axios from 'axios';

const render = async (req, res, axiosOptions = {}) => {
    axios.defaults.baseURL = axiosOptions.apiURL;

    const matchRoute = getRoutes().find(route => matchPath(req.path, route) || false);

    if (!matchRoute) {
        throw new Error(`Не найден подходящий route для ${req.url}!`);
    }

    if (!matchRoute.id) {
        throw new Error('У route не указан id!');
    }

    const store = configureStore({});

    const loadableComponent = matchRoute.component;

    if (!loadableComponent.preload) {
        throw new Error('preload() не существует!');
    }

    const component = await loadableComponent.preload();

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

    const modules = [];
    const context = {};

    const markup = ReactDOMServer.renderToString(
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    <App
                        preparedComponents={{ [matchRoute.id]: loadableComponent }}
                        routes={[matchRoute]}
                        simplePage={matchRoute.simplePage} />
                </StaticRouter>
            </Provider>
        </Loadable.Capture>
    );

    return {
        head: Helmet.renderStatic(),
        initialData: store.getState(),
        simplePage: matchRoute.simplePage,
        markup,
        modules,
        context
    };
};

export { render };
