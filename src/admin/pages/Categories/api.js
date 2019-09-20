import axios from 'axios';

export default class Api {
    static getCategories = () => axios.get('/api/categories');
}
