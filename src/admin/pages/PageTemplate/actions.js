import {
    GET, GET_SUCCESS, GET_ERROR,
    GET_COMPONENTS, GET_COMPONENTS_SUCCESS, GET_COMPONENTS_ERROR,
    SET, RESET
} from './constants';
import Api from './api';

export function get(name) {
    return async (dispatch) => {
        dispatch({ type: GET });

        try {
            const res = await Api.get(name);

            if (res.data && res.data.status === 'error') {
                dispatch({ type: GET_ERROR, payload: { message: res.data.message } });
                return;
            }

            dispatch({ type: GET_SUCCESS, payload: res.data.data });
        } catch(err) {
            // TODO
            dispatch({ type: GET_ERROR, payload: { message: 'Неизвестная ошибка!' }});
        }
    };
}

export function save() {
    return async (dispatch, getStore) => {
        const store = getStore();
        const { page, id } = store['admin-page-template'];

        try {
            const res = id ? await Api.save(id, page) : await Api.create(page);
            return res.data;
        } catch(err) {
            // TODO
            alert(err);
        }
    }
}

export function deleteTemplate() {
    return async (dispatch, getStore) => {
        const store = getStore();
        const { id } = store['admin-page-template'];

        try {
            const res = await Api.delete(id);

            return res.data;
        } catch(err) {
            // TODO
            alert(err);
        }
    };
}

export function set(layout) {
    return { type: SET, payload: layout };
}

export function getComponents() {
    return async (dispatch) => {
        dispatch({ type: GET_COMPONENTS });

        try {
            const res = await Api.getComponents();

            if (res.data && res.data.status === 'error') {
                dispatch({ type: GET_COMPONENTS_ERROR, payload: { message: res.data.message } });
                return;
            }

            dispatch({ type: GET_COMPONENTS_SUCCESS, payload: res.data.data });
        } catch(err) {
            dispatch({ type: GET_ERROR, payload: { message: 'Неизвестная ошибка!' }});
        }
    };
}

export function reset() {
    return { type: RESET }
}
