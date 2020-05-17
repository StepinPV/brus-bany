import axios from 'axios';

export default class Api {
    static get = () => axios.get('/api/components');
}
