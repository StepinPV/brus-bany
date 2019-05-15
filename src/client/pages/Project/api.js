import axios from '../../../utils/axios';

export default class Api {
    static getCategory = (categoryId) => axios.get(`/api/categories/${categoryId}`);
    static getProject = (categoryId, layoutId) => axios.get(`/api/projects/${categoryId}/${layoutId}`);
}
