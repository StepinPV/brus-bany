import {
    GET, GET_SUCCESS, GET_ERROR,
    GET_TEMPLATES, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_ERROR,
    SET, RESET
} from './constants';

export const initialState = {
    id: null,
    page: null,
    isPageFetch: false,
    isPageError: null,
    error: null,
    templates: null,
    isTemplateFetch: false,
    isTemplateError: null,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET:
            return {
                ...state,
                isPageFetch: true
            };

        case GET_SUCCESS:
            return {
                ...state,
                isPageFetch: false,
                id: action.payload['_id'],
                page: {
                    ...action.payload,
                    config: {
                        componentsData: {},
                        components: {},
                        ...action.payload.config
                    }
                },
                // TODO
                // page: action.payload
            };

        case GET_ERROR:
            return {
                ...state,
                isPageFetch: false,
                isPageError: action.payload.message
            };

        case SET:
            return {
                ...state,
                page: action.payload
            };

        case RESET:
            return {
                ...initialState
            };

        case GET_TEMPLATES:
            return {
                ...state,
                isTemplateFetch: true
            };

        case GET_TEMPLATES_SUCCESS:
            return {
                ...state,
                isTemplateError: false,
                templates: action.payload
            };

        case GET_TEMPLATES_ERROR:
            return {
                ...state,
                isTemplateFetch: false,
                isTemplateError: action.payload.message
            };

        default:
            return state;
    }
}
