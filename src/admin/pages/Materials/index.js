import Materials from './Materials';
import reducer, { initialState } from './reducer';
import { init } from './actions';

export default {
    id: 'admin-materials',
    component: Materials,
    reducer,
    initialState,
    initialAction: init
};
