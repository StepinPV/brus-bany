import axios from 'axios';

export default class Api {
    static getPhotos = () => axios.get(`/api/photos`, {
        params: {
            withProject: true,
            withLayout: true,
            withCategory: true
        }
    });

    static getArticles = () => axios.get('/api/articles');
}
