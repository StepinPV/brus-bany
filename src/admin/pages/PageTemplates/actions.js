import { GET, GET_SUCCESS, GET_ERROR, RESET } from './constants';
import Api from './api';

export function get() {
    return async (dispatch) => {
        dispatch({ type: GET });

        try {
            const res = await Api.get();

            dispatch({ type: GET_SUCCESS, payload: res.data.data });
        } catch(err) {
            dispatch({ type: GET_ERROR });
        }
    };
}

export function reset() {
    return { type: RESET }
}

export function init() {
    return async (dispatch) => {
        await dispatch(get());
    }
}
