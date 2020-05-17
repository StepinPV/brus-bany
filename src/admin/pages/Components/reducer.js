import { GET, GET_SUCCESS, GET_ERROR, RESET } from './constants';

export const initialState = {
    data: null,
    isFetch: false,
    isError: null
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
                data: action.payload
            };

        case GET_ERROR:
            return {
                ...state,
                isFetch: false,
                isError: true
            };

        case RESET:
            return {
                ...initialState
            };

        default:
            return state;
    }
}
