import Articles from './Articles';
import reducer, { initialState } from './reducer';
import { init } from './actions';

export default {
    id: 'admin-articles',
    component: Articles,
    reducer,
    initialState,
    initialAction: init
};
