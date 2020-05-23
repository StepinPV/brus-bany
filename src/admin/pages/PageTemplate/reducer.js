import {
    GET, GET_SUCCESS, GET_ERROR,
    SET, RESET
} from './constants';

export const initialState = {
    id: null,
    data: null,
    isDataFetch: false,
    isDataError: null,
    error: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET:
            return {
                ...state,
                isDataFetch: true
            };

        case GET_SUCCESS:
            return {
                ...state,
                isDataFetch: false,
                id: action.payload['_id'],
                data: action.payload
            };

        case GET_ERROR:
            return {
                ...state,
                isDataFetch: false,
                isDataError: action.payload.message
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
