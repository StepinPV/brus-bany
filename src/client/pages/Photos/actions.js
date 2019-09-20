import {
    GET_PHOTOS, GET_PHOTOS_SUCCESS, GET_PHOTOS_ERROR,
    GET_CATEGORIES, GET_CATEGORIES_ERROR, GET_CATEGORIES_SUCCESS,
    RESET_DATA
} from './constants';
import Api from './api';

export function loadData() {
    return async (dispatch) => {
        dispatch({ type: GET_CATEGORIES });

        try {
            const res = await Api.getCategories();

            for (const category of res.data.data) {
                await dispatch(getPhotos(category._id));
            }

            dispatch({ type: GET_CATEGORIES_SUCCESS, payload: res.data.data });
        } catch(err) {
            dispatch({ type: GET_CATEGORIES_ERROR });
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
