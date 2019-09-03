import { GET_ARTICLES, GET_ARTICLES_SUCCESS, GET_ARTICLES_ERROR, RESET_DATA } from './constants';

export const initialState = {
    articles: null,
    isArticlesFetch: false,
    isArticlesError: null
};

/**
 * Редьюсер
 * @param {Object} state
 * @param {Object} action
 * @returns {*}
 */
export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ARTICLES:
            return {
                ...state,
                isArticlesFetch: true
            };

        case GET_ARTICLES_SUCCESS:
            return {
                ...state,
                isArticlesFetch: false,
                articles: action.payload
            };

        case GET_ARTICLES_ERROR:
            return {
                ...state,
                isArticlesFetch: false,
                isArticlesError: true
            };

        case RESET_DATA:
            return {
                ...initialState
            };

        default:
            return state;
    }
}
