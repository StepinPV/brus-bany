import {
    GET_PHOTOS, GET_PHOTOS_ERROR, GET_PHOTOS_SUCCESS,
    GET_CATEGORY, GET_CATEGORY_ERROR, GET_CATEGORY_SUCCESS,
    RESET_DATA
} from './constants';

export const initialState = {
    photos: null,
    isPhotosFetch: false,
    isPhotosError: null,

    category: null,
    isCategoryFetch: false,
    isCategoryError: null
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
                isPhotosFetch: true
            };

        case GET_PHOTOS_SUCCESS:
            return {
                ...state,
                isPhotosFetch: false,
                photos: action.payload
            };

        case GET_PHOTOS_ERROR:
            return {
                ...state,
                isPhotosFetch: false,
                isPhotosError: true
            };

        case GET_CATEGORY:
            return {
                ...state,
                isCategoryFetch: true
            };

        case GET_CATEGORY_SUCCESS:
            return {
                ...state,
                isCategoryFetch: false,
                category: action.payload
            };

        case GET_CATEGORY_ERROR:
            return {
                ...state,
                isCategoryFetch: false,
                isCategoryError: true
            };

        case RESET_DATA:
            return {
                ...initialState
            };

        default:
            return state;
    }
}
