import Layout from './Layout';
import reducer, { initialState } from './reducer';
import {init} from "../Categories/actions";

export const info = {
    id: 'admin-layout',
    reducer,
    initialState,
    initialAction: init
};

export default Layout;
