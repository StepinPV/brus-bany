import axios from 'axios';

export default class Api {
    static getArticles = () => axios.get('/api/articles');
}
