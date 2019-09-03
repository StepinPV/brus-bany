import {
    GET_CATEGORIES, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_ERROR,
    GET_REPORTS, GET_REPORTS_ERROR, GET_REPORTS_SUCCESS,
    RESET_DATA
} from './constants';

export const initialState = {
    categories: null,
    isCategoriesFetch: false,
    isCategoriesError: null,

    reports: null,
    isReportsFetch: false,
    isReportsError: null
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

        case GET_REPORTS:
            return {
                ...state,
                isReportsFetch: true
            };

        case GET_REPORTS_SUCCESS:
            return {
                ...state,
                isReportsFetch: false,
                reports: action.payload
            };

        case GET_REPORTS_ERROR:
            return {
                ...state,
                isReportsFetch: false,
                isReportsError: true
            };

        case RESET_DATA:
            return {
                ...initialState
            };

        default:
            return state;
    }
}
