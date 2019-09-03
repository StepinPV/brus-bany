import {
    GET_PHOTOS, GET_PHOTOS_ERROR, GET_PHOTOS_SUCCESS,
    GET_CATEGORIES, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_ERROR,
    RESET_DATA
} from './constants';

export const initialState = {
    id: null,
    photos: {},

    categories: null,
    isCategoriesFetch: false,
    isCategoriesError: null
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
                photos: {
                    ...state.photos,
                    [action.categoryId]: {
                        isFetch: true
                    }
                }
            };

        case GET_PHOTOS_SUCCESS:
            return {
                ...state,
                photos: {
                    ...state.photos,
                    [action.categoryId]: {
                        isFetch: false,
                        photos: action.payload
                    }
                }
            };

        case GET_PHOTOS_ERROR:
            return {
                ...state,
                [action.categoryId]: {
                    isFetch: false,
                    isError: true
                }
            };

        case GET_CATEGORIES:
            return {
                ...state,
                isCategoriesFetch: true
            };

        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                isCategoriesFetch: false,
                categories: action.payload
            };

        case GET_CATEGORIES_ERROR:
            return {
                ...state,
                isCategoriesFetch: false,
                isCategoriesError: true
            };

        case RESET_DATA:
            return {
                ...initialState
            };

        default:
            return state;
    }
}
