import Layouts from './Layouts';
import reducer, { initialState } from './reducer';
import { init } from './actions';

export default {
    id: 'admin-layouts',
    component: Layouts,
    reducer,
    initialState,
    initialAction: init
};
