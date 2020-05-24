import axios from 'axios';

export default class Api {
    static get = (id) => axios.get(`/api/page-templates/${id}`);
    static save = (id, data) => axios.put(`/api/page-templates/${id}`, { data });
    static create = (data) => axios.post(`/api/page-templates`, { data });
    static delete = (id) => axios.delete(`/api/page-templates/${id}`);
}
