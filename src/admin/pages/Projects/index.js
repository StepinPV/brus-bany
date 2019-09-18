import Projects from './Projects';
import reducer, { initialState } from './reducer';
import { init } from './actions';

export const info = {
    id: 'admin-projects',
    reducer,
    initialState,
    initialAction: init
};

export default Projects;
