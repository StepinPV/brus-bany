import Projects from './Projects';
import reducer, { initialState } from './reducer';
import { init } from './actions';

export default {
    id: 'admin-projects',
    component: Projects,
    reducer,
    initialState,
    initialAction: init
};
