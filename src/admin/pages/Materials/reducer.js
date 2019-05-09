import {
    GET_MATERIALS, GET_MATERIALS_SUCCESS, GET_MATERIALS_ERROR,
    CREATE_MATERIAL_SUCCESS, UPDATE_MATERIAL_SUCCESS, DELETE_MATERIAL_SUCCESS,
    RESET_DATA
} from './constants';

export const initialState = {
    id: null,
    materials: null,
    isMaterialsFetch: false,
    isMaterialsError: null,
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
        case GET_MATERIALS:
            return {
                ...state,
                isMaterialsFetch: true
            };

        case GET_MATERIALS_SUCCESS:
            return {
                ...state,
                isMaterialsFetch: false,
                materials: action.payload
            };

        case GET_MATERIALS_ERROR:
            return {
                ...state,
                isMaterialsFetch: false,
                isMaterialsError: action.payload.message
            };

        case CREATE_MATERIAL_SUCCESS:
            return {
                ...state,
                materials: action.payload
            };

        case UPDATE_MATERIAL_SUCCESS:
            return {
                ...state,
                materials: action.payload
            };

        case DELETE_MATERIAL_SUCCESS:
            return {
                ...state,
                materials: action.payload
            };

        case RESET_DATA:
            return {
                ...initialState
            };

        default:
            return state;
    }
}
