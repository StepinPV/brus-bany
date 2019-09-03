import {
    GET_ARTICLE, GET_ARTICLE_SUCCESS, GET_ARTICLE_ERROR,
    SET_ARTICLE, RESET_DATA
} from './constants';
import Api from './api';

export function getArticle(name) {
    return async (dispatch) => {
        dispatch({ type: GET_ARTICLE });

        try {
            const res = await Api.getArticle(name);

            if (res.data && res.data.status === 'error') {
                dispatch({ type: GET_ARTICLE_ERROR, payload: { message: res.data.message } });
                return;
            }

            dispatch({ type: GET_ARTICLE_SUCCESS, payload: res.data.data });
        } catch(err) {
            // TODO
            dispatch({ type: GET_ARTICLE_ERROR, payload: { message: 'Неизвестная ошибка!' }});
        }
    };
}

export function saveArticle() {
    return async (dispatch, getStore) => {
        const store = getStore();
        const { article, id } = store['admin-article'];

        try {
            const res = id ? await Api.saveArticle(id, article) : await Api.createArticle(article);
            return res.data;
        } catch(err) {
            // TODO
            alert(err);
        }
    }
}

export function deleteArticle() {
    return async (dispatch, getStore) => {
        const store = getStore();
        const { id } = store['admin-article'];

        try {
            const res = await Api.deleteArticle(id);

            return res.data;
        } catch(err) {
            // TODO
            alert(err);
        }
    };
}

export function setArticle(article) {
    return { type: SET_ARTICLE, payload: article };
}

export function resetData() {
    return { type: RESET_DATA }
}
