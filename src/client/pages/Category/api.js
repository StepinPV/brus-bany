import axios from '../../../utils/axios';

export default class Api {
    static getCategory = (name) => axios.get(`/api/categories/${name}`, {
        params: {
            byName: true
        }
    });
    static getProjects = (id) => axios.get(`/api/projects/${id}`, {
        params: {
            byName: true,
            withLayout: true
        }
    });
    static getPhotos = (id) => axios.get(`/api/photos/${id}`, {
        params: {
            forCategory: true,
            byName: true,
            withProject: true,
            withLayout: true
        }
    });
}
