import axios from 'axios';

export default class Api {
    static getArticle = (name) => axios.get(`/api/articles/${name}`, {
        params: {
            byName: true
        }
    });

    static saveArticle = (id, article) => {
        return axios.put(`/api/articles/${id}`, { article });
    };

    static createArticle = (article) => {
        return axios.post(`/api/articles`, { article });
    };

    static deleteArticle = (id) => {
        return axios.delete(`/api/articles/${id}`);
    };
}
