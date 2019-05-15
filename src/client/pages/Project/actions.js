import {
    GET_CATEGORY, GET_CATEGORY_SUCCESS, GET_CATEGORY_ERROR,
    GET_PROJECT, GET_PROJECTS_SUCCESS, GET_PROJECTS_ERROR,
    RESET_DATA
} from './constants';
import Api from './api';

export function getCategory(id) {
    return async (dispatch) => {
        dispatch({ type: GET_CATEGORY });

        try {
            const res = await Api.getCategory(id);

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

export function getProject(categoryId, layoutId) {
    return async (dispatch) => {
        dispatch({ type: GET_PROJECT });

        try {
            const res = await Api.getProject(categoryId, layoutId);

            dispatch({ type: GET_PROJECTS_SUCCESS, payload: res.data.data });
        } catch(err) {
            dispatch({ type: GET_PROJECTS_ERROR });
        }
    };
}

export function resetData() {
    return { type: RESET_DATA }
}
