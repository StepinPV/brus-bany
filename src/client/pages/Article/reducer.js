import {
    GET_ARTICLE, GET_ARTICLE_ERROR, GET_ARTICLE_SUCCESS,
    RESET_DATA
} from './constants';

export const initialState = {
    id: null,
    article: null,
    isArticleFetch: false,
    isArticleError: null,
    notFound: false
};

/**
 * Редьюсер
 * @param {Object} state
 * @param {Object} action
 * @returns {*}
 */
export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ARTICLE:
            return {
                ...state,
                isArticleFetch: true
            };

        case GET_ARTICLE_SUCCESS:
            return {
                ...state,
                isArticleFetch: false,
                article: action.payload,
                notFound: !Boolean(action.payload)
            };

        case GET_ARTICLE_ERROR:
            return {
                ...state,
                isArticleFetch: false,
                isArticleError: true
            };

        case RESET_DATA:
            return {
                ...initialState
            };

        default:
            return state;
    }
}
