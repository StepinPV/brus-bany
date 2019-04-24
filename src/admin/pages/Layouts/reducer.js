import { GET_LAYOUTS, GET_LAYOUTS_SUCCESS, GET_LAYOUTS_ERROR } from './constants';

export const initialState = {
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

        default:
            return state;
    }
}
