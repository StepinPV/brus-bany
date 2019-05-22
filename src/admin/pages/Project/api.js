import axios from '../../../utils/axios';
import toFormData from '../../../utils/MultipartFormData';

export default class Api {
    static create = project => axios.post(`/api/projects/${project.categoryId}/${project.layoutId}`, { project });
    static read = (categoryId, layoutId) => axios.get(`/api/projects/${categoryId}/${layoutId}`);
    static update = project => axios.put(`/api/projects/${project.categoryId}/${project.layoutId}`, { project });
    static delete = project => axios.delete(`/api/projects/${project.categoryId}/${project.layoutId}`);

    static getLayouts = () => axios.get('/api/layouts');

    static uploadFile = (project, file, imageId) => {
        return axios.put(`/api/projects/${project.categoryId}/${project.layoutId}/${imageId}/upload-file`, { file }, {
            transformRequest: [toFormData],
        });
    };

    static deleteFile = (project, imageId) => {
        return axios.put(`/api/projects/${project.categoryId}/${project.layoutId}/${imageId}/delete-file`);
    };

    static getMaterials = () => axios.get('/api/materials');
}
