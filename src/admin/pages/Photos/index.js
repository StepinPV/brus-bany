import Photos from './Photos';
import reducer, { initialState } from './reducer';
import { init } from './actions';

export const info = {
    id: 'admin-photos',
    reducer,
    initialState,
    initialAction: init
};

export default Photos;
