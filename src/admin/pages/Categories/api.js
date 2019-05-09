import axios from '../../../utils/axios';

export default class Api {
    static getCategories = () => axios.get('/api/categories');
}
