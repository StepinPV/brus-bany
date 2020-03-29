import {
    GET_PHOTOS_SUCCESS, GET_CATEGORIES_SUCCESS, RESET_DATA
} from './constants';

export const initialState = {
    id: null,

    photos: null,
    categories: null
};

/**
 * Редьюсер
 * @param {Object} state
 * @param {Object} action
 * @returns {*}
 */
export default function(state = initialState, action) {
    switch (action.type) {
        case GET_PHOTOS_SUCCESS:
            return {
                ...state,
                photos: action.payload
            };

        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload
            };

        case RESET_DATA:
            return {
                ...initialState
            };

        default:
            return state;
    }
}
