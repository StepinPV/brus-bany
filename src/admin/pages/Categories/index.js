import Categories from './Categories';
import reducer, { initialState } from './reducer';
import { init } from './actions';

export const info = {
    id: 'admin-categories',
    reducer,
    initialState,
    initialAction: init
};

export default Categories;
