import axios from '../../../utils/axios';

export default class Api {
    static get = () => axios.get('/api/materials');
    static create = (material) => axios.post('/api/materials', { material });
    static update = (material) => axios.put(`/api/materials/${material._id}`, { material });
    static delete = (material) => axios.delete(`/api/materials/${material._id}`);
}
