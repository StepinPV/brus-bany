import {
    GET_CATEGORY, GET_CATEGORY_SUCCESS, GET_CATEGORY_ERROR,
    SET_CATEGORY, RESET_DATA
} from './constants';
import Api from './api';

export function getCategory(name) {
    return async (dispatch) => {
        dispatch({ type: GET_CATEGORY });

        try {
            const res = await Api.getCategory(name);

            if (res.data && res.data.status === 'error') {
                dispatch({ type: GET_CATEGORY_ERROR, payload: { message: res.data.message } });
                return;
            }

            dispatch({ type: GET_CATEGORY_SUCCESS, payload: res.data.data });
        } catch(err) {
            // TODO
            dispatch({ type: GET_CATEGORY_ERROR, payload: { message: 'Неизвестная ошибка!' }});
        }
    };
}

export function saveCategory() {
    return async (dispatch, getStore) => {
        const store = getStore();
        const { category, id } = store['admin-category'];

        try {
            const res = id ? await Api.saveCategory(id, category) : await Api.createCategory(category);
            return res.data;
        } catch(err) {
            // TODO
            alert(err);
        }
    }
}

export function deleteCategory() {
    return async (dispatch, getStore) => {
        const store = getStore();
        const { id } = store['admin-category'];

        try {
            const res = await Api.deleteCategory(id);
            return res.data;
        } catch(err) {
            // TODO
            alert(err);
        }
    }
}

export function setCategory(layout) {
    return { type: SET_CATEGORY, payload: layout };
}

export function resetData() {
    return { type: RESET_DATA }
}
