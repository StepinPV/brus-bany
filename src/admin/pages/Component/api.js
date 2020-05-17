import axios from 'axios';

export default class Api {
    static get = (id) => axios.get(`/api/components/${id}`);
    static save = (id, component) => axios.put(`/api/components/${id}`, { component });
    static create = (component) => axios.post(`/api/components`, { component });
    static delete = (id) => axios.delete(`/api/components/${id}`);
}
