import Category from './Category';
import reducer, { initialState } from './reducer';
import {init} from "../Categories/actions";

export const info = {
    id: 'admin-category',
    reducer,
    initialState,
    initialAction: init
};

export default Category;
