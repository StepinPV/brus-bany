import PageTemplates from './PageTemplates';
import reducer, { initialState } from './reducer';
import { init } from './actions';

export const info = {
    id: 'admin-page-templates',
    reducer,
    initialState,
    initialAction: init
};

export default PageTemplates;
