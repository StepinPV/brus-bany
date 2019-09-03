import {
    GET_PHOTOS, GET_PHOTOS_SUCCESS, GET_PHOTOS_ERROR,
    GET_CATEGORY, GET_CATEGORY_SUCCESS, GET_CATEGORY_ERROR,
    RESET_DATA
} from './constants';
import Api from './api';

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

export function getCategory(categoryName) {
    return async (dispatch) => {
        dispatch({ type: GET_CATEGORY });

        try {
            const res = await Api.getCategory(categoryName);

            dispatch({ type: GET_CATEGORY_SUCCESS, payload: res.data.data });
        } catch(err) {
            dispatch({ type: GET_CATEGORY_ERROR });
        }
    };
}

export function resetData() {
    return { type: RESET_DATA }
}
