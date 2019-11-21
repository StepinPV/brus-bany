import axios from 'axios';

export default class Api {
    static getProject = (categoryName, layoutName) => axios.get(`/api/projects/${categoryName}/${layoutName}`, {
        params: {
            byName: true,
            withCategory: true,
            withLayout: true
        }
    });
    static getPhotos = (id) => axios.get(`/api/photos/${id}`, {
        params: {
            forProject: true,
            withProject: true,
            withLayout: true,
            withCategory: true
        }
    });
}
