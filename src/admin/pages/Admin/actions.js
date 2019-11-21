import { UPDATE_PRICES, UPDATE_PRICES_SUCCESS, UPDATE_PRICES_ERROR } from './constants';
import Api from './api';

export function updatePrices() {
    return async (dispatch) => {
        dispatch({ type: UPDATE_PRICES });

        try {
            const res = await Api.updatePrices();

            if (res.data.status === 'success') {
                dispatch({ type: UPDATE_PRICES_SUCCESS });
                return true;
            }

            dispatch({ type: UPDATE_PRICES_ERROR });
            return false;
        } catch(err) {
            dispatch({ type: UPDATE_PRICES_ERROR });
            return false;
        }
    };
}
