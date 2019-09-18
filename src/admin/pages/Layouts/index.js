import Layouts from './Layouts';
import reducer, { initialState } from './reducer';
import { init } from './actions';

export const info = {
    id: 'admin-layouts',
    reducer,
    initialState,
    initialAction: init
};

export default Layouts;
