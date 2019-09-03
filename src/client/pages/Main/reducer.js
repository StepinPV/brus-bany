import {
    GET_PHOTOS, GET_PHOTOS_ERROR, GET_PHOTOS_SUCCESS,
    GET_ARTICLES, GET_ARTICLES_ERROR, GET_ARTICLES_SUCCESS,
    RESET_DATA
} from './constants';

export const initialState = {
    photos: [],
    articles: []
};

/**
 * Редьюсер
 * @param {Object} state
 * @param {Object} action
 * @returns {*}
 */
export default function(state = initialState, action) {
    switch (action.type) {
        case GET_PHOTOS:
            return {
                ...state
            };

        case GET_PHOTOS_SUCCESS:
            return {
                ...state,
                photos: action.payload
            };

        case GET_PHOTOS_ERROR:
            return {
                ...state
            };

        case GET_ARTICLES:
            return {
                ...state
            };

        case GET_ARTICLES_ERROR:
            return {
                ...state
            };

        case GET_ARTICLES_SUCCESS:
            return {
                ...state,
                articles: action.payload
            };

        case RESET_DATA:
            return {
                ...initialState
            };

        default:
            return state;
    }
}
