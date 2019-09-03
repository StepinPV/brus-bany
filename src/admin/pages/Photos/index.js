import Photos from './Photos';
import reducer, { initialState } from './reducer';
import { init } from './actions';

export default {
    id: 'admin-photos',
    component: Photos,
    reducer,
    initialState,
    initialAction: init
};
