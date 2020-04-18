import {
    GET_CATEGORY, GET_CATEGORY_SUCCESS, GET_CATEGORY_ERROR,
    GET_PROJECTS, GET_PROJECTS_ERROR, GET_PROJECTS_SUCCESS,
    GET_PHOTOS, GET_PHOTOS_ERROR, GET_PHOTOS_SUCCESS,
    RESET_DATA
} from './constants';
import { sortByDate } from '@utils/sort';

export const initialState = {
    id: null,
    category: null,
    isCategoryFetch: false,
    isCategoryError: null,
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
        case GET_CATEGORY:
            return {
                ...state,
                isCategoryFetch: true
            };

        case GET_CATEGORY_SUCCESS:
            return {
                ...state,
                isCategoryFetch: false,
                id: action.payload._id,
                category: action.payload
            };

        case GET_CATEGORY_ERROR:
            return {
                ...state,
                isCategoryFetch: false,
                isCategoryError: action.payload.message
            };

        case GET_PROJECTS:
            return {
                ...state,
                isProjectsFetch: true
            };

        case GET_PROJECTS_SUCCESS:
            return {
                ...state,
                isProjectsFetch: false,
                projects: action.payload
            };

        case GET_PROJECTS_ERROR:
            return {
                ...state,
                isProjectsFetch: false,
                isProjectsError: true
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
                photos: action.payload ? sortByDate(action.payload).slice(0, 6) : []
            };

        case GET_PHOTOS_ERROR:
            return {
                ...state,
                isPhotosFetch: false,
                isPhotosError: true
            };

        case RESET_DATA:
            return {
                ...initialState
            };

        default:
            return state;
    }
}
