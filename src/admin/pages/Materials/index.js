import Materials from './Materials';
import reducer, { initialState } from './reducer';
import { init } from './actions';

export const info = {
    id: 'admin-materials',
    reducer,
    initialState,
    initialAction: init
};

export default Materials;
