import {
    GET_ARTICLE, GET_ARTICLE_SUCCESS, GET_ARTICLE_ERROR,
    SET_ARTICLE, RESET_DATA
} from './constants';

export const initialState = {
    id: null,
    article: null,
    isArticleFetch: false,
    isArticleError: null,
    error: null
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
                id: action.payload['_id'],
                article: action.payload
            };

        case GET_ARTICLE_ERROR:
            return {
                ...state,
                isArticleFetch: false,
                isArticleError: action.payload.message
            };

        case SET_ARTICLE:
            return {
                ...state,
                article: action.payload
            };

        case RESET_DATA:
            return {
                ...initialState
            };

        default:
            return state;
    }
}
