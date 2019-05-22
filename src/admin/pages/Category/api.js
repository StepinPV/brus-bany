import axios from '../../../utils/axios';

export default class Api {
    static getCategory = (id) => axios.get(`/api/categories/${id}`);

    static saveCategory = (id, category) => {
        return axios.put(`/api/categories/${id}`, { category });
    };

    static createCategory = (category) => {
        return axios.post(`/api/categories/add`, { category });
    };

    static deleteCategory = (id) => {
        return axios.delete(`/api/categories/${id}`);
    };
}
