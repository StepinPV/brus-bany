import {
    GET_PROJECT, GET_PROJECTS_SUCCESS, GET_PROJECTS_ERROR,
    GET_PHOTOS, GET_PHOTOS_ERROR, GET_PHOTOS_SUCCESS,
    RESET_DATA
} from './constants';
import Api from './api';

export function getProject(categoryId, layoutId) {
    return async (dispatch) => {
        dispatch({ type: GET_PROJECT });

        try {
            const res = await Api.getProject(categoryId, layoutId);

            if (res.data.status === 'error') {
                dispatch({ type: GET_PROJECTS_ERROR, payload: { message: res.data.message } });
                return;
            }

            dispatch({ type: GET_PROJECTS_SUCCESS, payload: res.data.data });
        } catch(err) {
            dispatch({ type: GET_PROJECTS_ERROR, payload: { message: 'Неизвестная ошибка!' } });
        }
    };
}

export function getPhotos(categoryId, layoutId) {
    return async (dispatch) => {
        dispatch({ type: GET_PHOTOS });

        try {
            const res = await Api.getPhotos(categoryId, layoutId);

            dispatch({ type: GET_PHOTOS_SUCCESS, payload: res.data.data });
        } catch(err) {
            dispatch({ type: GET_PHOTOS_ERROR });
        }
    };
}

export function resetData() {
    return { type: RESET_DATA }
}
