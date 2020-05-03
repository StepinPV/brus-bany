import axios from 'axios';

export default class Api {
    static getPages = () => axios.get('/api/pages');
}
