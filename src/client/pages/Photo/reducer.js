import {
    GET_PHOTOS, GET_PHOTOS_ERROR, GET_PHOTOS_SUCCESS,
    RESET_DATA
} from './constants';

export const initialState = {
    photo: null,
    isPhotoFetch: false,
    isPhotoError: null
};

/**
 * Редьюсер
 * @param {Object} state
 * @param {Object} action
 * @returns {*}
 */
export default function(state = initialState, action) {
    switch (action.type) {
        case GET_PHOTOS:
            return {
                ...state,
                isPhotoFetch: true
            };

        case GET_PHOTOS_SUCCESS:
            return {
                ...state,
                isPhotoFetch: false,
                photo: action.payload
            };

        case GET_PHOTOS_ERROR:
            return {
                ...state,
                isPhotoFetch: false,
                isPhotoError: true
            };

        case RESET_DATA:
            return {
                ...initialState
            };

        default:
            return state;
    }
}
