import Pages from './Pages';
import reducer, { initialState } from './reducer';
import { init } from './actions';

export const info = {
    id: 'admin-pages',
    reducer,
    initialState,
    initialAction: init
};

export default Pages;
