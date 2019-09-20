import axios from 'axios';

export default class Api {
    static getLayouts = () => axios.get('/api/layouts');
}
