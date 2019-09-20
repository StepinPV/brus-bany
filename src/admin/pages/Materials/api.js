import axios from 'axios';

export default class Api {
    static get = () => axios.get('/api/materials');
    static create = (material) => axios.post('/api/materials', { material });
    static update = (material) => {
        const data = { ...material };
        delete data._id;
        return axios.put(`/api/materials/${material._id}`, { material: data })
    };
    static delete = (material) => axios.delete(`/api/materials/${material._id}`);
}
