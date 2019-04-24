import axios from '../../../utils/axios';

export default class Api {
    static getLayout = (id) => axios.get(`/api/layout/${id}`);
    static getLayoutFormat = () => axios.get('/api/layout-format');
}
