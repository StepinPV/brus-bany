import axios from '../../../utils/axios';

export default class Api {
    static getLayouts = () => axios.get('/api/layouts');
}
