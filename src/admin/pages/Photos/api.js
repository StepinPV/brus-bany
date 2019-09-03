import axios from '../../../utils/axios';

export default class Api {
    static getCategories = () => axios.get('/api/categories');
    static getReports = categoryId => axios.get(`/api/photos/${categoryId}`, {
        params: {
            forCategory: true,
            withLayout: true,
            withProject: true
        }
    });
}
