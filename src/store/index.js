import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

const applyReduxDevtoolsExtension = !process.env.ssr &&
    process.env.NODE_ENV !== 'production' &&
    '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__' in window;

const composeEnhancers =
    // eslint-disable-next-line no-underscore-dangle
    applyReduxDevtoolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const REPLACE_STATE = 'REPLACE_STATE';

const replaceStateReducer = (state = {}, action) => {
    switch (action.type) {
        case REPLACE_STATE:
            return {
                ...state,
                [action.payload.key]: action.payload.state
            };

        default:
            return state;
    }
};

/**
 * createReducerManager
 * @returns {{
 *  add: add,
 *  getReducerMap: (function()),
 *  reduce: (function(*=, *=): any),
 *  remove: remove
 * }}
 */
export function createReducerManager() {
    // Create an object which maps keys to reducers
    const reducers = {};

    let combinedReducer = null;

    // An array which is used to delete state keys when reducers are removed
    let keysToRemove = [];

    return {
        getReducerMap: () => reducers,

        reduce: (state, action) => {
            // If any reducers have been removed, clean up their state first
            if (keysToRemove.length > 0) {
                state = { ...state };
                for (const key of keysToRemove) {
                    delete state[key];
                }
                keysToRemove = [];
            }

            state = replaceStateReducer(state, action);

            if (combinedReducer) {
                state = combinedReducer(state, action);
            }

            return state;
        },

        add: (key, reducer) => {
            if (!key || reducers[key]) {
                return;
            }

            reducers[key] = reducer;
            combinedReducer = combineReducers(reducers);

            return true;
        },

        remove: key => {
            if (!key || !reducers[key]) {
                return;
            }

            delete reducers[key];

            keysToRemove.push(key);
            combinedReducer = combineReducers(reducers);
        }
    };
}

/**
 * configureStore
 * @param {Object} state
 * @returns {Store}
 */
export default (state) => {
    const reducerManager = createReducerManager();
    const stateHouse = { ...state };

    const store = createStore(
        reducerManager.reduce,
        state,
        composeEnhancers(
            applyMiddleware(
                thunk.withExtraArgument({})
            )
        )
    );

    store.reducerManager = reducerManager;

    store.addReducer = (key, reducer, initialState) => {
        if (reducerManager.add(key, reducer)) {
            store.dispatch({ type: REPLACE_STATE, payload: { key, state: stateHouse[key] || initialState } });
            delete stateHouse[key];
        }
    };

    return store;
}

