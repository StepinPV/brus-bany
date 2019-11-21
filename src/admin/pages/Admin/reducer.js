import { UPDATE_PRICES, UPDATE_PRICES_SUCCESS, UPDATE_PRICES_ERROR } from './constants';

export const initialState = {
    isUpdatePricesFetch: false
};

/**
 * Редьюсер
 * @param {Object} state
 * @param {Object} action
 * @returns {*}
 */
export default function(state = initialState, action) {
    switch (action.type) {
        case UPDATE_PRICES:
            return {
                ...state,
                isUpdatePricesFetch: true
            };

        case UPDATE_PRICES_SUCCESS:
        case UPDATE_PRICES_ERROR:
            return {
                ...state,
                isUpdatePricesFetch: false
            };

        default:
            return state;
    }
}
