import Articles from './Articles';
import reducer, { initialState } from './reducer';

export default {
    id: 'client-articles',
    component: Articles,
    reducer,
    initialState
};
