import {
    GET_LAYOUT, GET_LAYOUT_SUCCESS, GET_LAYOUT_ERROR,
    GET_LAYOUT_FORMAT, GET_LAYOUT_FORMAT_SUCCESS, GET_LAYOUT_FORMAT_ERROR
} from './constants';

export const initialState = {
    layout: null,
    isLayoutFetch: false,
    isLayoutError: null,

    layoutFormat: null,
    isLayoutFormatFetch: false,
    isLayoutFormatError: null,
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
                layout: action.payload
            };

        case GET_LAYOUT_ERROR:
            return {
                ...state,
                isLayoutFetch: false,
                isLayoutError: true
            };

        case GET_LAYOUT_FORMAT:
            return {
                ...state,
                isLayoutFormatFetch: true
            };

        case GET_LAYOUT_FORMAT_SUCCESS:
            return {
                ...state,
                isLayoutFormatFetch: false,
                layoutFormat: action.payload
            };

        case GET_LAYOUT_FORMAT_ERROR:
            return {
                ...state,
                isLayoutFormatFetch: false,
                isLayoutFormatError: true
            };

        default:
            return state;
    }
}
