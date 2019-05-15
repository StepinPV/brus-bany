import axios from '../../../utils/axios';

export default class Api {
    static getCategory = (id) => axios.get(`/api/categories/${id}`);
    static getProjects = (id) => axios.get(`/api/projects/${id}`);
}
