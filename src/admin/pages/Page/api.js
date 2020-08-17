import axios from 'axios';

export default class Api {
    static get = (id) => axios.get(`/api/pages/${id}`);
    static save = (id, page) => axios.put(`/api/pages/${id}`, { page });
    static create = (page) => axios.post(`/api/pages`, { page });
    static delete = (id) => axios.delete(`/api/pages/${id}`);
    static getTemplates = () => axios.get('/api/page-templates');
    static getFolders = () => axios.get('/api/page-folders');
}
