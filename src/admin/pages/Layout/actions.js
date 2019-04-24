import {
    GET_LAYOUT, GET_LAYOUT_SUCCESS, GET_LAYOUT_ERROR,
    GET_LAYOUT_FORMAT, GET_LAYOUT_FORMAT_SUCCESS, GET_LAYOUT_FORMAT_ERROR
} from './constants';
import Api from './api';

export function getLayout(id) {
    return async (dispatch) => {
        dispatch({ type: GET_LAYOUT });

        try {
            const res = await Api.getLayout(id);

            dispatch({ type: GET_LAYOUT_SUCCESS, payload: res.data });
        } catch(err) {
            dispatch({ type: GET_LAYOUT_ERROR });
        }
    };
}

export function getLayoutFormat() {
    return async (dispatch) => {
        dispatch({ type: GET_LAYOUT_FORMAT });

        try {
            const res = await Api.getLayoutFormat();

            dispatch({ type: GET_LAYOUT_FORMAT_SUCCESS, payload: res.data });
        } catch(err) {
            dispatch({ type: GET_LAYOUT_FORMAT_ERROR });
        }
    };
}
