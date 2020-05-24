import {
    GET, GET_SUCCESS, GET_ERROR,
    GET_TEMPLATES, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_ERROR,
    SET, RESET
} from './constants';
import Api from './api';

export function getPage(name) {
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

export function getTemplates() {
    return async (dispatch) => {
        dispatch({ type: GET_TEMPLATES });

        try {
            const res = await Api.getTemplates();

            if (res.data && res.data.status === 'error') {
                dispatch({ type: GET_TEMPLATES_ERROR, payload: { message: res.data.message } });
                return;
            }

            dispatch({ type: GET_TEMPLATES_SUCCESS, payload: res.data.data });
        } catch(err) {
            // TODO
            dispatch({ type: GET_TEMPLATES_ERROR, payload: { message: 'Неизвестная ошибка!' }});
        }
    };
}

export function savePage() {
    return async (dispatch, getStore) => {
        const store = getStore();
        const { page, id } = store['admin-page'];

        try {
            const res = id ? await Api.save(id, page) : await Api.create(page);
            return res.data;
        } catch(err) {
            // TODO
            alert(err);
        }
    }
}

export function deletePage() {
    return async (dispatch, getStore) => {
        const store = getStore();
        const { id } = store['admin-page'];

        try {
            const res = await Api.delete(id);

            return res.data;
        } catch(err) {
            // TODO
            alert(err);
        }
    };
}

export function setPage(layout) {
    return { type: SET, payload: layout };
}

export function reset() {
    return { type: RESET }
}
