import {
    GET_PAGES, GET_PAGES_SUCCESS, GET_PAGES_ERROR,
    GET_FOLDERS, GET_FOLDERS_SUCCESS, GET_FOLDERS_ERROR,
    RESET_DATA
} from './constants';
import Api from './api';

export function getPages(folderId) {
    return async (dispatch) => {
        dispatch({ type: GET_PAGES });

        try {
            const res = await Api.getPages();

            const pages = res.data.data.filter(page => !page.config.folder && !folderId || page.config.folder === folderId);

            dispatch({ type: GET_PAGES_SUCCESS, payload: pages });
        } catch(err) {
            dispatch({ type: GET_PAGES_ERROR });
        }
    };
}

export function getFolders() {
    return async (dispatch) => {
        dispatch({ type: GET_FOLDERS });

        try {
            const res = await Api.getFolders();

            dispatch({ type: GET_FOLDERS_SUCCESS, payload: res.data.data });
        } catch(err) {
            dispatch({ type: GET_FOLDERS_ERROR });
        }
    };
}

export function resetData() {
    return { type: RESET_DATA }
}

export function init(folderId) {
    return async (dispatch) => {
        await Promise.all([dispatch(getPages(folderId)), dispatch(getFolders(folderId))]);
    }
}
