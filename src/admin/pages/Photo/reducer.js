import {
    GET_REPORT, GET_REPORT_SUCCESS, GET_REPORT_ERROR,
    GET_LAYOUTS, GET_LAYOUTS_SUCCESS, GET_LAYOUTS_ERROR,
    SET_REPORT, RESET_DATA
} from './constants';

export const initialState = {
    id: null,
    report: null,
    isReportFetch: false,
    isReportError: null,

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
        case GET_REPORT:
            return {
                ...state,
                isReportFetch: true
            };

        case GET_REPORT_SUCCESS:
            return {
                ...state,
                isReportFetch: false,
                id: action.payload._id,
                report: action.payload
            };

        case GET_REPORT_ERROR:
            return {
                ...state,
                isReportFetch: false,
                isReportError: action.payload.message
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
                projects: action.payload
            };

        case GET_LAYOUTS_ERROR:
            return {
                ...state,
                isLayoutsFetch: false,
                isLayoutsError: true
            };

        case SET_REPORT:
            return {
                ...state,
                report: action.payload
            };

        case RESET_DATA:
            return {
                ...initialState
            };

        default:
            return state;
    }
}
