import axios from 'axios';

export default class Api {
    static getPhotos = (categoryId) => axios.get(`/api/photos${categoryId ? `/${categoryId}` : ''}`, {
        params: {
            forCategory: true,
            byName: true,
            withProject: true,
            withLayout: true,
            withCategory: true
        }
    });
    static getCategories = () => axios.get('/api/categories');
}
