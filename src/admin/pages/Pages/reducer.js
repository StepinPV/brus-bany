import {
    GET_PAGES, GET_PAGES_SUCCESS, GET_PAGES_ERROR,
    GET_FOLDERS, GET_FOLDERS_SUCCESS, GET_FOLDERS_ERROR,
    RESET_DATA
} from './constants';

export const initialState = {
    pages: null,
    isPagesFetch: false,
    isPagesError: null,

    folders: null,
    isFoldersFetch: false,
    isFoldersError: null
};

/**
 * Редьюсер
 * @param {Object} state
 * @param {Object} action
 * @returns {*}
 */
export default function(state = initialState, action) {
    switch (action.type) {
        case GET_PAGES:
            return {
                ...state,
                isPagesFetch: true
            };

        case GET_PAGES_SUCCESS:
            return {
                ...state,
                isPagesFetch: false,
                pages: action.payload
            };

        case GET_PAGES_ERROR:
            return {
                ...state,
                isPagesFetch: false,
                isPagesError: true
            };

        case GET_FOLDERS:
            return {
                ...state,
                isFoldersFetch: true
            };

        case GET_FOLDERS_SUCCESS:
            return {
                ...state,
                isFoldersFetch: false,
                folders: action.payload
            };

        case GET_FOLDERS_ERROR:
            return {
                ...state,
                isFoldersFetch: false,
                isFoldersError: true
            };

        case RESET_DATA:
            return {
                ...initialState
            };

        default:
            return state;
    }
}
