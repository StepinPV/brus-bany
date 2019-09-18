import Articles from './Articles';
import reducer, { initialState } from './reducer';
import { init } from './actions';

export const info = {
    id: 'admin-articles',
    reducer,
    initialState,
    initialAction: init
};

export default Articles;
