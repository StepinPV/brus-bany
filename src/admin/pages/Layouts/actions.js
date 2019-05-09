import { GET_LAYOUTS, GET_LAYOUTS_SUCCESS, GET_LAYOUTS_ERROR, RESET_DATA } from './constants';
import Api from './api';

export function getLayouts() {
    return async (dispatch) => {
        dispatch({ type: GET_LAYOUTS });

        try {
            const res = await Api.getLayouts();

            dispatch({ type: GET_LAYOUTS_SUCCESS, payload: res.data.data });
        } catch(err) {
            dispatch({ type: GET_LAYOUTS_ERROR });
        }
    };
}

export function resetData() {
    return { type: RESET_DATA }
}

export function init() {
    return async (dispatch) => {
        await dispatch(getLayouts());
    }
}
