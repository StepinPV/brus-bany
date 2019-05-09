import Categories from './Categories';
import reducer, { initialState } from './reducer';
import { init } from './actions';

export default {
    id: 'admin-categories',
    component: Categories,
    reducer,
    initialState,
    initialAction: init
};
