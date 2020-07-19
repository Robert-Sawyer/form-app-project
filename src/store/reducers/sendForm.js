import * as actionTypes from '../actions/actionTypes';

const initialState = {
    data: [],
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEND_FORM_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.SEND_FORM_SUCCESS:
            const newForm = {
                ...action.formData,
                id: action.formId
            }
            return {
                ...state,
                loading: false,
                data: state.data.concat(newForm)
            };
        case actionTypes.SEND_FORM_FAIL:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};

export default reducer;