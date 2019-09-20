import axios from 'axios';

export default class Api {
    static getPhoto = id => axios.get(`/api/photos/${id}`, {
        params: {
            withProject: true,
            withLayout: true,
            withCategory: true
        }
    });
}
