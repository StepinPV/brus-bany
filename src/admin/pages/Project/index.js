import Project from './Project';
import reducer, { initialState } from './reducer';

export const info = {
    id: 'admin-project',
    reducer,
    initialState,
    initialAction: init
};

export default Project;
