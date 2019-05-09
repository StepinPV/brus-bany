import {
    GET_LAYOUT, GET_LAYOUT_SUCCESS, GET_LAYOUT_ERROR,
    SET_LAYOUT, RESET_DATA
} from './constants';

export const initialState = {
    id: null,
    layout: null,
    isLayoutFetch: false,
    isLayoutError: null,
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
        case GET_LAYOUT:
            return {
                ...state,
                isLayoutFetch: true
            };

        case GET_LAYOUT_SUCCESS:
            return {
                ...state,
                isLayoutFetch: false,
                id: action.payload['_id'],
                layout: action.payload
            };

        case GET_LAYOUT_ERROR:
            return {
                ...state,
                isLayoutFetch: false,
                isLayoutError: action.payload.message
            };

        case SET_LAYOUT:
            return {
                ...state,
                layout: action.payload
            };

        case RESET_DATA:
            return {
                ...initialState
            };

        default:
            return state;
    }
}
