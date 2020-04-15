import axios from 'axios';

export default class Api {
    static getCategories = () => axios.get('/api/categories');
    static getProjects = categoryId => axios.get(`/api/projects/${categoryId}`, {
        params: {
            withLayout: true,
            withCategory: true
        }
    });
}
