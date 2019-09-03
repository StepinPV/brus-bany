import axios from '../../../utils/axios';

export default class Api {
    static getLayout = (name) => axios.get(`/api/layouts/${name}`, {
        params: {
            byName: true
        }
    });

    static saveLayout = (id, layout) => {
        return axios.put(`/api/layouts/${id}`, { layout });
    };

    static createLayout = (layout) => {
        return axios.post(`/api/layouts`, { layout });
    };

    static deleteLayout = (id) => {
        return axios.delete(`/api/layouts/${id}`);
    };
}
