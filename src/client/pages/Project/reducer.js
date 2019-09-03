import {
    GET_PROJECT, GET_PROJECTS_ERROR, GET_PROJECTS_SUCCESS,
    GET_PHOTOS, GET_PHOTOS_ERROR, GET_PHOTOS_SUCCESS,
    RESET_DATA
} from './constants';

export const initialState = {
    id: null,
    isProjectFetch: false,
    isProjectError: null,
    error: null,
    photos: null
};

/**
 * Редьюсер
 * @param {Object} state
 * @param {Object} action
 * @returns {*}
 */
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

        default:
            return state;
    }
}
