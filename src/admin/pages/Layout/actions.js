import {
    GET_LAYOUT, GET_LAYOUT_SUCCESS, GET_LAYOUT_ERROR,
    SET_LAYOUT, RESET_DATA
} from './constants';
import Api from './api';

export function getLayout(id) {
    return async (dispatch) => {
        dispatch({ type: GET_LAYOUT });

        try {
            const res = await Api.getLayout(id);

            if (res.data && res.data.status === 'error') {
                dispatch({ type: GET_LAYOUT_ERROR, payload: { message: res.data.message } });
                return;
            }

            dispatch({ type: GET_LAYOUT_SUCCESS, payload: res.data.data });
        } catch(err) {
            // TODO
            dispatch({ type: GET_LAYOUT_ERROR, payload: { message: 'Неизвестная ошибка!' }});
        }
    };
}

export function saveLayout() {
    return async (dispatch, getStore) => {
        const store = getStore();
        const { layout, id } = store['admin-layout'];

        try {
            const res = id ? await Api.saveLayout(id, layout) : await Api.createLayout(layout);
            return res.data;
        } catch(err) {
            // TODO
            alert(err);
        }
    }
}

export function deleteLayout() {
    return async (dispatch, getStore) => {
        const store = getStore();
        const { id } = store['admin-layout'];

        try {
            const res = await Api.deleteLayout(id);

            return res.data;
        } catch(err) {
            // TODO
            alert(err);
        }
    };
}

export function setLayout(layout) {
    return { type: SET_LAYOUT, payload: layout };
}

export function resetData() {
    return { type: RESET_DATA }
}
