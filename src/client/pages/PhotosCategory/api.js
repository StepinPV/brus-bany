import axios from '../../../utils/axios';

export default class Api {
    static getPhotos = (categoryId) => axios.get(`/api/photos/${categoryId}`, {
        params: {
            forCategory: true,
            byName: true,
            withProject: true,
            withLayout: true
        }
    });

    static getCategory = (categoryName) => axios.get(`/api/categories/${categoryName}`, {
        params: {
            byName: true
        }
    });
}
