import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';
import configureStore from './store';
import App from './components/App';
import getRoutes from './routes';
import * as serviceWorker from './serviceWorker';
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
    /* eslint-enable no-underscore-dangle*/

    await Loadable.preloadReady();

    const routes = getRoutes(module => {
        if (module && module.id && module.reducer) {
            store.addReducer(module.id, module.reducer, module.initialState);
        }
    });

    ReactDOM.hydrate(
        <Provider store={store}>
            <BrowserRouter>
                <App routes={routes} />
            </BrowserRouter>
        </Provider>,
        document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
