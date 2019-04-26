import axios from '../../../utils/axios';

export default class Api {
    static getLayout = (id) => axios.get(`/api/layouts/${id}`);

    static saveLayout = (id, layout) => {
        return axios.put(`/api/layouts/${id}`, { layout });
    };

    static createLayout = (layout) => {
        return axios.post(`/api/layouts/add`, { layout });
    };
}
