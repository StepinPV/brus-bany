import axios from 'axios';

export default class Api {
    static get = (id) => axios.get(`/api/page-templates/${id}`);
    static save = (id, page) => axios.put(`/api/page-templates/${id}`, { page });
    static create = (page) => axios.post(`/api/page-templates`, { page });
    static delete = (id) => axios.delete(`/api/page-templates/${id}`);
}
