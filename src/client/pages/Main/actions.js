import {
    GET_PHOTOS, GET_PHOTOS_SUCCESS, GET_PHOTOS_ERROR,
    GET_ARTICLES, GET_ARTICLES_SUCCESS, GET_ARTICLES_ERROR,
    RESET_DATA
} from './constants';
import Api from './api';

export function getPhotos() {
    return async (dispatch) => {
        dispatch({ type: GET_PHOTOS });

        try {
            const res = await Api.getPhotos();

            dispatch({ type: GET_PHOTOS_SUCCESS, payload: res.data.data });
        } catch(err) {
            dispatch({ type: GET_PHOTOS_ERROR });
        }
    };
}

export function getArticles() {
    return async (dispatch) => {
        dispatch({ type: GET_ARTICLES });

        try {
            const res = await Api.getArticles();

            dispatch({ type: GET_ARTICLES_SUCCESS, payload: res.data.data });
        } catch(err) {
            dispatch({ type: GET_ARTICLES_ERROR });
        }
    };
}

export function resetData() {
    return { type: RESET_DATA }
}
