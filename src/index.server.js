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

import componentsPaths from './constructorComponents/meta';

async function getComponents(componentsInfo) {
    const constructors = {};
    const ids = [];

    const addId = (id) => {
        if (!ids.includes(id)) {
            ids.push(id);
        }
    };

    const checkDeps = async (id) => {
        const dependencies = (await componentsPaths[id].loadMeta()).dependencies;

        if (dependencies) {
            for (const depId of dependencies) {
                addId(depId);
                await checkDeps(depId);
            }
        }
    };

    for (const { componentId } of componentsInfo) {
        addId(componentId);
        await checkDeps(componentId);

        constructors[componentId] = (await componentsPaths[componentId].load()).default;
    }

    return { constructors, ids };
}

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

    let componentConstructors = null;
    let componentIds = null;
    let page = null;

    if (matchRoute && matchRoute.id === 'page-generator') {
        const pageRes = await axios.get(`/api/pages/${encodeURIComponent(req.path)}`, {
            params: {
                byUrl: true
            }
        });

        if (pageRes.data && pageRes.data.status !== 'error' && pageRes.data.data) {
            page = pageRes.data.data;
            const components = await getComponents(page.config.components);

            componentConstructors = components.constructors;
            componentIds = components.ids;
        }
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

    const markup = ReactDOMServer[matchRoute.simplePage ? 'renderToStaticMarkup' : 'renderToString'](
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    <App
                        preparedComponents={{ [matchRoute.id]: loadableComponent }}
                        page={page}
                        componentConstructors={componentConstructors}
                        routes={[matchRoute]}
                        simplePage={matchRoute.simplePage} />
                </StaticRouter>
            </Provider>
        </Loadable.Capture>
    );

    return {
        head: Helmet.renderStatic(),
        initialData: store.getState(),
        pageData: page,
        simplePage: matchRoute.simplePage,
        markup,
        modules,
        componentIds,
        context
    };
};

export { render };
