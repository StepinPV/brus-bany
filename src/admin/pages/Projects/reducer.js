import {
    GET_CATEGORIES, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_ERROR,
    GET_PROJECTS, GET_PROJECTS_ERROR, GET_PROJECTS_SUCCESS,
    RESET_DATA
} from './constants';

export const initialState = {
    categories: null,
    isCategoriesFetch: false,
    isCategoriesError: null,

    projects: null,
    isProjectsFetch: false,
    isProjectsError: null
};

/**
 * Редьюсер
 * @param {Object} state
 * @param {Object} action
 * @returns {*}
 */
export default function(state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                isCategoriesFetch: true
            };

        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                isCategoriesFetch: false,
                categories: action.payload
            };

        case GET_CATEGORIES_ERROR:
            return {
                ...state,
                isCategoriesFetch: false,
                isCategoriesError: true
            };

        case GET_PROJECTS:
            return {
                ...state,
                isProjectsFetch: true
            };

        case GET_PROJECTS_SUCCESS:
            return {
                ...state,
                isProjectsFetch: false,
                projects: action.payload
            };

        case GET_PROJECTS_ERROR:
            return {
                ...state,
                isProjectsFetch: false,
                isProjectsError: true
            };

        case RESET_DATA:
            return {
                ...initialState
            };

        default:
            return state;
    }
}
