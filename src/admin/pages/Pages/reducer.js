import { GET_PAGES, GET_PAGES_SUCCESS, GET_PAGES_ERROR, RESET_DATA } from './constants';

export const initialState = {
    pages: null,
    isPagesFetch: false,
    isPagesError: null
};

/**
 * Редьюсер
 * @param {Object} state
 * @param {Object} action
 * @returns {*}
 */
export default function(state = initialState, action) {
    switch (action.type) {
        case GET_PAGES:
            return {
                ...state,
                isPagesFetch: true
            };

        case GET_PAGES_SUCCESS:
            return {
                ...state,
                isPagesFetch: false,
                pages: action.payload
            };

        case GET_PAGES_ERROR:
            return {
                ...state,
                isPagesFetch: false,
                isPagesError: true
            };

        case RESET_DATA:
            return {
                ...initialState
            };

        default:
            return state;
    }
}
