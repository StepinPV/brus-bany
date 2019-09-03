import Article from './Article';
import reducer, { initialState } from './reducer';

export default {
    id: 'client-article',
    component: Article,
    reducer,
    initialState
};
