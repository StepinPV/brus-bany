import axios from 'axios';

export default class Api {
    static getCategory = (name) => axios.get(`/api/categories/${name}`, {
        params: {
            byName: true
        }
    });

    static saveCategory = (id, category) => {
        return axios.put(`/api/categories/${id}`, { category });
    };

    static createCategory = (category) => {
        return axios.post(`/api/categories`, { category });
    };

    static deleteCategory = (id) => {
        return axios.delete(`/api/categories/${id}`);
    };
}
