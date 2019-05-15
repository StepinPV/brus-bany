import {
    GET_CATEGORY, GET_CATEGORY_SUCCESS, GET_CATEGORY_ERROR,
    GET_PROJECT, GET_PROJECTS_ERROR, GET_PROJECTS_SUCCESS,
    RESET_DATA
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

        case GET_PROJECT:
            return {
                ...state,
                isProjectFetch: true
            };

        case GET_PROJECTS_SUCCESS:
            return {
                ...state,
                isProjectFetch: false,
                project: action.payload
            };

        case GET_PROJECTS_ERROR:
            return {
                ...state,
                isProjectFetch: false,
                isProjectError: true
            };

        case RESET_DATA:
            return {
                ...initialState
            };

        default:
            return state;
    }
}
