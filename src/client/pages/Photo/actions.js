import {
    GET_PHOTOS, GET_PHOTOS_SUCCESS, GET_PHOTOS_ERROR,
    RESET_DATA
} from './constants';
import Api from './api';

export function getPhoto(id) {
    return async (dispatch) => {
        dispatch({ type: GET_PHOTOS });

        try {
            const res = await Api.getPhoto(id);

            dispatch({ type: GET_PHOTOS_SUCCESS, payload: res.data.data });
        } catch(err) {
            dispatch({ type: GET_PHOTOS_ERROR });
        }
    };
}

export function resetData() {
    return { type: RESET_DATA }
}
