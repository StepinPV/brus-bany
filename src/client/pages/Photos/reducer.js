import {
    GET_PHOTOS_SUCCESS, GET_PHOTOS_ERROR,
    GET_CATEGORIES_SUCCESS, RESET_DATA
} from './constants';
import { sortByDate } from '@utils/sort';

export const initialState = {
    id: null,
    photos: null,
    photosError: false,
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
                photos: sortByDate(action.payload)
            };

        case GET_PHOTOS_ERROR:
            return {
                ...state,
                photosError: true
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
