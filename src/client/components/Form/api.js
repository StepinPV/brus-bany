import axios from '../../../utils/axios';

export default class Api {
    static send = (request) => {
        return axios.post(`/api/requests`, { request });
    };
}
