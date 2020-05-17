import Components from './Components';
import reducer, { initialState } from './reducer';
import { init } from './actions';

export const info = {
    id: 'admin-components',
    reducer,
    initialState,
    initialAction: init
};

export default Components;
