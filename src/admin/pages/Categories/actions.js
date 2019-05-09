import { GET_CATEGORIES, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_ERROR, RESET_DATA } from './constants';
import Api from './api';

export function getCategories() {
    return async (dispatch) => {
        dispatch({ type: GET_CATEGORIES });

        try {
            const res = await Api.getCategories();

            dispatch({ type: GET_CATEGORIES_SUCCESS, payload: res.data.data });
        } catch(err) {
            dispatch({ type: GET_CATEGORIES_ERROR });
        }
    };
}

export function resetData() {
    return { type: RESET_DATA }
}

export function init() {
    return async (dispatch) => {
        await dispatch(getCategories());
    }
}
