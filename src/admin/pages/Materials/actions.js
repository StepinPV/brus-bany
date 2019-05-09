import {
    GET_MATERIALS, GET_MATERIALS_SUCCESS, GET_MATERIALS_ERROR,
    CREATE_MATERIAL, CREATE_MATERIAL_SUCCESS, CREATE_MATERIAL_ERROR,
    UPDATE_MATERIAL, UPDATE_MATERIAL_SUCCESS, UPDATE_MATERIAL_ERROR,
    DELETE_MATERIAL, DELETE_MATERIAL_SUCCESS, DELETE_MATERIAL_ERROR,
    RESET_DATA
} from './constants';
import Api from './api';

export function getMaterials() {
    return async (dispatch) => {
        dispatch({ type: GET_MATERIALS });

        try {
            const res = await Api.get();

            if (res.data && res.data.status === 'error') {
                dispatch({ type: GET_MATERIALS_ERROR, payload: { message: res.data.message } });
                return;
            }

            dispatch({ type: GET_MATERIALS_SUCCESS, payload: res.data.data || {} });
        } catch(err) {
            // TODO
            dispatch({ type: GET_MATERIALS_ERROR, payload: { message: 'Неизвестная ошибка!' }});
        }
    };
}

export function createMaterial(material) {
    return async (dispatch, getStore) => {
        const store = getStore();
        const { materials } = store['admin-materials'];

        dispatch({ type: CREATE_MATERIAL });

        try {
            const res = await Api.create(material);

            if (res.data && res.data.status === 'error') {
                dispatch({ type: CREATE_MATERIAL_ERROR, payload: { message: res.data.message } });
                return res.data;
            }

            dispatch({ type: CREATE_MATERIAL_SUCCESS, payload: [...materials, { _id: res.data.data, ...material }]});
            return res.data;
        } catch(err) {
            // TODO
            dispatch({ type: CREATE_MATERIAL_ERROR, payload: { message: 'Неизвестная ошибка!' }});
        }
    };
}

export function updateMaterial(material) {
    return async (dispatch, getStore) => {
        const store = getStore();
        const { materials } = store['admin-materials'];

        dispatch({ type: UPDATE_MATERIAL });

        try {
            const res = await Api.update(material);

            if (res.data && res.data.status === 'error') {
                dispatch({ type: UPDATE_MATERIAL_ERROR, payload: { message: res.data.message } });
                return res.data;
            }

            const newMaterials = [...materials];
            const materialIndex = newMaterials.findIndex(item => item._id === material._id);

            newMaterials.splice(materialIndex, 1, material);

            dispatch({ type: UPDATE_MATERIAL_SUCCESS, payload: newMaterials });
            return res.data;
        } catch(err) {
            // TODO
            dispatch({ type: UPDATE_MATERIAL_ERROR, payload: { message: 'Неизвестная ошибка!' }});
        }
    };
}

export function deleteMaterial(material) {
    return async (dispatch, getStore) => {
        const store = getStore();
        const { materials } = store['admin-materials'];

        dispatch({ type: DELETE_MATERIAL });

        try {
            const res = await Api.delete(material);

            if (res.data && res.data.status === 'error') {
                dispatch({ type: DELETE_MATERIAL_ERROR, payload: { message: res.data.message } });
                return res.data;
            }

            const newMaterials = [...materials];
            const materialIndex = newMaterials.findIndex(item => item._id === material._id);

            newMaterials.splice(materialIndex, 1);

            dispatch({ type: DELETE_MATERIAL_SUCCESS, payload: newMaterials });
            return res.data;
        } catch(err) {
            // TODO
            dispatch({ type: DELETE_MATERIAL_ERROR, payload: { message: 'Неизвестная ошибка!' }});
        }
    };
}

export function resetData() {
    return { type: RESET_DATA }
}

export function init() {
    return async (dispatch) => {
        await dispatch(getMaterials());
    }
}
