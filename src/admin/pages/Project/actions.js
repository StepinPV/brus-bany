import {
    GET_PROJECT, GET_PROJECT_SUCCESS, GET_PROJECT_ERROR,
    GET_LAYOUTS, GET_LAYOUTS_ERROR, GET_LAYOUTS_SUCCESS,
    GET_CATEGORY, GET_CATEGORY_SUCCESS, GET_CATEGORY_ERROR,
    SET_PROJECT, RESET_DATA
} from './constants';
import Api from './api';

export function getProject(categoryId, layoutId) {
    return async (dispatch) => {
        dispatch({ type: GET_PROJECT });

        try {
            const res = await Api.read(categoryId, layoutId);

            if (res.data && res.data.status === 'error') {
                dispatch({ type: GET_PROJECT_ERROR, payload: { message: res.data.message } });
                return;
            }

            dispatch({ type: GET_PROJECT_SUCCESS, payload: res.data.data });
        } catch(err) {
            dispatch({ type: GET_PROJECT_ERROR, payload: { message: 'Неизвестная ошибка!' }});
        }
    };
}

export function createProject() {
    return async (dispatch, getStore) => {
        const store = getStore();
        const { project } = store['admin-project'];

        try {
            const res = await Api.create(project);
            return res.data;
        } catch(err) {
            alert(err);
        }
    }
}

export function updateProject() {
    return async (dispatch, getStore) => {
        const store = getStore();
        const { project } = store['admin-project'];

        try {
            const res = await Api.update(project);
            return res.data;
        } catch(err) {
            alert(err);
        }
    }
}

export function deleteProject() {
    return async (dispatch, getStore) => {
        const store = getStore();
        const { project } = store['admin-project'];

        try {
            const res = await Api.delete(project);
            return res.data;
        } catch(err) {
            alert(err);
        }
    }
}

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

export function getCategory(id) {
    return async (dispatch) => {
        dispatch({ type: GET_CATEGORY });

        try {
            const res = await Api.getCategory(id);

            dispatch({ type: GET_CATEGORY_SUCCESS, payload: res.data.data });
        } catch(err) {
            dispatch({ type: GET_CATEGORY_ERROR });
        }
    };
}

export function setProject(project) {
    return { type: SET_PROJECT, payload: project };
}

export function resetData() {
    return { type: RESET_DATA }
}
