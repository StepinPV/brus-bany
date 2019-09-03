import {
    GET_REPORT, GET_REPORT_SUCCESS, GET_REPORT_ERROR,
    GET_LAYOUTS, GET_LAYOUTS_ERROR, GET_LAYOUTS_SUCCESS,
    SET_REPORT, RESET_DATA
} from './constants';
import Api from './api';

export function getReport(id) {
    return async (dispatch) => {
        dispatch({ type: GET_REPORT });

        try {
            const res = await Api.read(id);

            if (res.data && res.data.status === 'error') {
                dispatch({ type: GET_REPORT_ERROR, payload: { message: res.data.message } });
                return;
            }

            dispatch({ type: GET_REPORT_SUCCESS, payload: res.data.data });
        } catch(err) {
            // TODO
            dispatch({ type: GET_REPORT_ERROR, payload: { message: 'Неизвестная ошибка!' }});
        }
    };
}

export function createReport() {
    return async (dispatch, getStore) => {
        const store = getStore();
        const { report } = store['admin-photo'];

        try {
            const res = await Api.create(report);
            return res.data;
        } catch(err) {
            // TODO
            alert(err);
        }
    }
}

export function updateReport() {
    return async (dispatch, getStore) => {
        const store = getStore();
        const { report } = store['admin-photo'];

        try {
            const res = await Api.update(report);
            return res.data;
        } catch(err) {
            // TODO
            alert(err);
        }
    }
}

export function deleteReport() {
    return async (dispatch, getStore) => {
        const store = getStore();
        const { report } = store['admin-photo'];

        try {
            const res = await Api.delete(report);
            return res.data;
        } catch(err) {
            // TODO
            alert(err);
        }
    }
}

export function getProjects(categoryId) {
    return async (dispatch) => {
        dispatch({ type: GET_LAYOUTS });

        try {
            const res = await Api.getProjects(categoryId);

            dispatch({ type: GET_LAYOUTS_SUCCESS, payload: res.data.data });
        } catch(err) {
            dispatch({ type: GET_LAYOUTS_ERROR });
        }
    };
}

export function setReport(report) {
    return { type: SET_REPORT, payload: report };
}

export function resetData() {
    return { type: RESET_DATA }
}
