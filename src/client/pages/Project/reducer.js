import {
    GET_PROJECT, GET_PROJECTS_ERROR, GET_PROJECTS_SUCCESS,
    RESET_DATA
} from './constants';

export const initialState = {
    id: null,
    isProjectFetch: false,
    isProjectError: null,
    error: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_PROJECT:
            return {
                ...state,
                isProjectFetch: true
            };

        case GET_PROJECTS_SUCCESS:
            return {
                ...state,
                isProjectFetch: false,
                project: action.payload
            };

        case GET_PROJECTS_ERROR:
            return {
                ...state,
                isProjectFetch: false,
                isProjectError: action.payload.message
            };

        case RESET_DATA:
            return {
                ...initialState
            };

        default:
            return state;
    }
}
