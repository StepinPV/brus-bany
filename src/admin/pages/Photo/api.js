import axios from 'axios';

export default class Api {
    static create = report => axios.post(`/api/photos/${report.projectId}`, { report });
    static read = id => axios.get(`/api/photos/${id}`);
    static update = report => axios.put(`/api/photos/${report['_id']}`, { report });
    static delete = report => axios.delete(`/api/photos/${report['_id']}`);

    static getProjects = categoryId => axios.get(`/api/projects/${categoryId}`, {
        params: {
            withLayout: true
        }
    });
}
