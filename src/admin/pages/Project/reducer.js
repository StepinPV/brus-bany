import {
    GET_PROJECT, GET_PROJECT_SUCCESS, GET_PROJECT_ERROR,
    GET_LAYOUTS, GET_LAYOUTS_SUCCESS, GET_LAYOUTS_ERROR,
    GET_CATEGORY, GET_CATEGORY_SUCCESS, GET_CATEGORY_ERROR,
    SET_PROJECT, RESET_DATA
} from './constants';

export const initialState = {
    id: null,
    project: null,
    isProjectFetch: false,
    isProjectError: null,

    layouts: null,
    isLayoutsFetch: false,
    isLayoutsError: null
};

/**
 * Редьюсер
 * @param {Object} state
 * @param {Object} action
 * @returns {*}
 */
export default function(state = initialState, action) {
    switch (action.type) {
        case GET_PROJECT:
            return {
                ...state,
                isProjectFetch: true
            };

        case GET_PROJECT_SUCCESS:
            return {
                ...state,
                isProjectFetch: false,
                id: action.payload._id,
                project: action.payload
            };

        case GET_PROJECT_ERROR:
            return {
                ...state,
                isProjectFetch: false,
                isProjectError: action.payload.message
            };

        case GET_LAYOUTS:
            return {
                ...state,
                isLayoutsFetch: true
            };

        case GET_LAYOUTS_SUCCESS:
            return {
                ...state,
                isLayoutsFetch: false,
                layouts: action.payload
            };

        case GET_LAYOUTS_ERROR:
            return {
                ...state,
                isLayoutsFetch: false,
                isLayoutsError: true
            };

        case GET_CATEGORY_SUCCESS:
            return {
                ...state,
                category: action.payload
            };

        case SET_PROJECT:
            return {
                ...state,
                project: action.payload
            };

        case RESET_DATA:
            return {
                ...initialState
            };

        default:
            return state;
    }
}
