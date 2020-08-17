import axios from 'axios';

export default class Api {
    static getPages = () => axios.get('/api/pages');
    static getFolders = () => axios.get('/api/page-folders');
}
