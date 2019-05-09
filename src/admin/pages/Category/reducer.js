import {
    GET_CATEGORY, GET_CATEGORY_SUCCESS, GET_CATEGORY_ERROR,
    SET_CATEGORY, RESET_DATA
} from './constants';

export const initialState = {
    id: null,
    category: null,
    isCategoryFetch: false,
    isCategoryError: null,
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
        case GET_CATEGORY:
            return {
                ...state,
                isCategoryFetch: true
            };

        case GET_CATEGORY_SUCCESS:
            return {
                ...state,
                isCategoryFetch: false,
                id: action.payload._id,
                category: action.payload
            };

        case GET_CATEGORY_ERROR:
            return {
                ...state,
                isCategoryFetch: false,
                isCategoryError: action.payload.message
            };

        case SET_CATEGORY:
            return {
                ...state,
                category: action.payload
            };

        case RESET_DATA:
            return {
                ...initialState
            };

        default:
            return state;
    }
}
