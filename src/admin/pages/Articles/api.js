import axios from '../../../utils/axios';

export default class Api {
    static getArticles = () => axios.get('/api/articles');
}
