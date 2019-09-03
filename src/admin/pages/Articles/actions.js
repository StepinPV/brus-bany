import { GET_ARTICLES, GET_ARTICLES_SUCCESS, GET_ARTICLES_ERROR, RESET_DATA } from './constants';
import Api from './api';

export function getLayouts() {
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

export function init() {
    return async (dispatch) => {
        await dispatch(getLayouts());
    }
}
