import axios from 'axios';

export default class Api {
    static get = (id) => axios.get(`/api/page-folders/${id}`);
    static save = (id, data) => axios.put(`/api/page-folders/${id}`, { data });
    static create = (data) => axios.post('/api/page-folders', { data });
    static delete = (id) => axios.delete(`/api/page-folders/${id}`);
}
