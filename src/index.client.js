import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';
import configureStore from './store';
import App from './components/App';
import getRoutes from './routes';
import getComponents from './constructorComponents/getComponents';
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
    const pageData = window.__pageData__;
    delete window.__pageData__;
    /* eslint-enable no-underscore-dangle */

    /* eslint-disable no-underscore-dangle */
    const customComponents = window.__customComponents__;
    delete window.__customComponents__;
    /* eslint-enable no-underscore-dangle */

    await Loadable.preloadReady();

    // TODO Вот тут не нужно добавлять все модули
    const routes = getRoutes(module => {
        if (module && module.id && module.reducer) {
            store.addReducer(module.id, module.reducer, module.initialState);
        }
    });

    const matchRoute = routes.find(route => matchPath(window.location.pathname, route) || false);

    let componentConstructors;
    if (pageData && pageData.url) {
        const { constructors } = await getComponents(pageData.config.components, false, customComponents);
        componentConstructors = constructors;
    }

    ReactDOM.hydrate(
        <Provider store={store}>
            <BrowserRouter>
                <App
                    routes={[matchRoute]}
                    page={pageData}
                    customComponents={customComponents}
                    componentConstructors={componentConstructors} />
            </BrowserRouter>
        </Provider>,
        document.getElementById('root')
    );
}
