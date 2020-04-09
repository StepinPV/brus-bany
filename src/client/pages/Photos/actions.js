import {
    GET_PHOTOS_SUCCESS, GET_PHOTOS_ERROR,
    GET_CATEGORIES_SUCCESS, RESET_DATA
} from './constants';
import Api from './api';

export function getCategories() {
    return async (dispatch) => {
        try {
            const res = await Api.getCategories();

            dispatch({ type: GET_CATEGORIES_SUCCESS, payload: res.data.data });
        } catch(err) {
        }
    };
}

export function getPhotos(categoryId) {
    return async (dispatch) => {
        try {
            const res = await Api.getPhotos(categoryId);

            if (res.data.status === 'error') {
                dispatch({ type: GET_PHOTOS_ERROR });
                return;
            }

            dispatch({ type: GET_PHOTOS_SUCCESS, categoryId, payload: res.data.data });
        } catch(err) {
            dispatch({ type: GET_PHOTOS_ERROR });
        }
    };
}

export function resetData() {
    return { type: RESET_DATA }
}
