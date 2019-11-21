import axios from 'axios';

export default class Api {
    static updatePrices = () => axios.post('/api/projects/update-prices');
}
