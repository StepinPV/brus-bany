import Project from './Project';
import reducer, { initialState } from './reducer';
import {init} from "../Photos/actions";

export const info = {
    id: 'admin-project',
    reducer,
    initialState,
    initialAction: init
};

export default Project;
