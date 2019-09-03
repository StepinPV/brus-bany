import {
    GET_ARTICLE, GET_ARTICLE_SUCCESS, GET_ARTICLE_ERROR,
    RESET_DATA
} from './constants';
import Api from './api';

export function getArticle(name) {
    return async (dispatch) => {
        dispatch({ type: GET_ARTICLE });

        try {
            const res = await Api.getArticle(name);

            dispatch({ type: GET_ARTICLE_SUCCESS, payload: res.data.data });
        } catch(err) {
            dispatch({ type: GET_ARTICLE_ERROR });
        }
    };
}

export function resetData() {
    return { type: RESET_DATA }
}
