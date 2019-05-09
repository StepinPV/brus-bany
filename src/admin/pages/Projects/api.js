import axios from '../../../utils/axios';

export default class Api {
    static getCategories = () => axios.get('/api/categories');
    static getProjects = categoryId => axios.get(`/api/projects/${categoryId}`);
}
