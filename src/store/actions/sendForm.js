import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const sendFormStart = () => {
    return {
        type: actionTypes.SEND_FORM_START
    };
};

export const sendFormSuccess = (id, formData) => {
    return {
        type: actionTypes.SEND_FORM_SUCCESS,
        formId: id,
        formData: formData
    };
};

export const sendFormFail = (error) => {
    return {
        type: actionTypes.SEND_FORM_FAIL,
        error: error
    };
};

export const sendForm = (data) => {
    return dispatch => {
        dispatch(sendFormStart());

        axios.post('forms.json', data)
            .then(response => {
                console.log(data);
                dispatch(sendFormSuccess(response.data.name, data));
            })
            .catch(err => {
                dispatch(sendFormFail(err));
            })
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: 'SET_REDIRECT_PATH',
        path: path
    };
};