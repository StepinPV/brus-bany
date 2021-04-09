import {
    GET, GET_SUCCESS, GET_ERROR, SET, RESET
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
            dispatch({ type: GET_ERROR, payload: { message: 'Неизвестная ошибка!' }});
        }
    };
}

export function save() {
    return async (dispatch, getStore) => {
        const store = getStore();
        const { data, id } = store['admin-folder'];

        try {
            const res = id ? await Api.save(id, data) : await Api.create(data);
            return res.data;
        } catch(err) {
            alert(err);
        }
    }
}

export function deleteData() {
    return async (dispatch, getStore) => {
        const store = getStore();
        const { id } = store['admin-folder'];

        try {
            const res = await Api.delete(id);

            return res.data;
        } catch(err) {
            alert(err);
        }
    };
}

export function set(data) {
    return { type: SET, payload: data };
}

export function reset() {
    return { type: RESET }
}
