import {
    GET, GET_SUCCESS, GET_ERROR,
    SET, RESET
} from './constants';

export const initialState = {
    id: null,
    data: null,
    isFetch: false,
    isError: null,
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
                isFetch: true
            };

        case GET_SUCCESS:
            return {
                ...state,
                isFetch: false,
                id: action.payload['_id'],
                data: action.payload
            };

        case GET_ERROR:
            return {
                ...state,
                isFetch: false,
                isError: action.payload.message
            };

        case SET:
            return {
                ...state,
                data: action.payload
            };

        case RESET:
            return {
                ...initialState
            };

        default:
            return state;
    }
}
