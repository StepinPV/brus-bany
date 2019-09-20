import axios from 'axios';

export default class Api {
    static getArticle = (name) => axios.get(`/api/articles/${name}`, {
        params: {
            byName: true
        }
    });
}
