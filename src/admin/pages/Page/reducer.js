import {
    GET, GET_SUCCESS, GET_ERROR,
    SET, RESET
} from './constants';

export const initialState = {
    id: null,
    page: null,
    isPageFetch: false,
    isPageError: null,
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
        case GET:
            return {
                ...state,
                isPageFetch: true
            };

        case GET_SUCCESS:
            return {
                ...state,
                isPageFetch: false,
                id: action.payload['_id'],
                page: action.payload
            };

        case GET_ERROR:
            return {
                ...state,
                isPageFetch: false,
                isPageError: action.payload.message
            };

        case SET:
            return {
                ...state,
                page: action.payload
            };

        case RESET:
            return {
                ...initialState
            };

        default:
            return state;
    }
}
