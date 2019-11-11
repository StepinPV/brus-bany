import axios from 'axios';

export default class Api {
    static create = project => axios.post(`/api/projects/${project.categoryId}/${project.layoutId}`, { project });
    static read = (categoryId, layoutId) => axios.get(`/api/projects/${categoryId}/${layoutId}`, {
        params: {
            withCategory: true,
            withLayout: true
        }
    });
    static update = project => axios.put(`/api/projects/${project.categoryId._id}/${project.layoutId._id}`, {
        project: {
            ...project,
            categoryId: project.categoryId._id,
            layoutId: project.layoutId._id
        }
    });
    static delete = project => axios.delete(`/api/projects/${project['_id']}`);

    static getLayouts = () => axios.get('/api/layouts');
    static getMaterials = () => axios.get('/api/materials');
}
