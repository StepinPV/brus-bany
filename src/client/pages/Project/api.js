import axios from 'axios';

export default class Api {
    static getProject = (categoryName, layoutName) => axios.get(`/api/projects/${categoryName}/${layoutName}`, {
        params: {
            byName: true,
            withCategory: true,
            withLayout: true
        }
    });
    static getPhotos = (categoryId, layoutId) => axios.get(`/api/photos/${categoryId}:${layoutId}`, {
        params: {
            byName: true,
            forProject: true,
            withProject: true,
            withLayout: true,
            withCategory: true
        }
    });
}
