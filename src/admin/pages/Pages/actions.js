import { GET_PAGES, GET_PAGES_SUCCESS, GET_PAGES_ERROR, RESET_DATA } from './constants';
import Api from './api';

export function getPages() {
    return async (dispatch) => {
        dispatch({ type: GET_PAGES });

        try {
            const res = await Api.getPages();

            dispatch({ type: GET_PAGES_SUCCESS, payload: res.data.data });
        } catch(err) {
            dispatch({ type: GET_PAGES_ERROR });
        }
    };
}

export function resetData() {
    return { type: RESET_DATA }
}

export function init() {
    return async (dispatch) => {
        await dispatch(getPages());
    }
}
