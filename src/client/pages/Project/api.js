import axios from 'axios';

export default class Api {
    static getProject = (categoryName, layoutName) => axios.get(`/api/projects/${categoryName}/${layoutName}`, {
        params: {
            byName: true,
            withCategory: true,
            withLayout: true
        }
    });
}
