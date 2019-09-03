import {
    GET_CATEGORY, GET_CATEGORY_SUCCESS, GET_CATEGORY_ERROR,
    GET_PROJECTS, GET_PROJECTS_SUCCESS, GET_PROJECTS_ERROR,
    GET_PHOTOS, GET_PHOTOS_SUCCESS, GET_PHOTOS_ERROR,
    RESET_DATA
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

export function getProjects(name) {
    return async (dispatch) => {
        dispatch({ type: GET_PROJECTS });

        try {
            const res = await Api.getProjects(name);

            dispatch({ type: GET_PROJECTS_SUCCESS, payload: res.data.data });
        } catch(err) {
            dispatch({ type: GET_PROJECTS_ERROR });
        }
    };
}

export function getPhotos(categoryId) {
    return async (dispatch) => {
        dispatch({ type: GET_PHOTOS, categoryId });

        try {
            const res = await Api.getPhotos(categoryId);

            dispatch({ type: GET_PHOTOS_SUCCESS, categoryId, payload: res.data.data });
        } catch(err) {
            dispatch({ type: GET_PHOTOS_ERROR, categoryId });
        }
    };
}

export function resetData() {
    return { type: RESET_DATA }
}
