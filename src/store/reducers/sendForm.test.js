import reducer from './sendForm';
import * as actionTypes from '../actions/actionTypes';

describe('sendForm reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            data: [],
            loading: false
        });
    });

    it('should return start state', () => {
        expect(reducer({
            data: [],
            loading: false
        }, {
            type: actionTypes.SEND_FORM_START
        })).toEqual({
            data: [],
            loading: true
        })
    });

    it('should return state after sending data', () => {
        expect(reducer({
            data: [],
            loading: true
        }, {
            type: actionTypes.SEND_FORM_SUCCESS,
            formId: 4,
            formData: {
                formData: {
                    name: 'Robert',
                    surname: 'Olbrychowski',
                    email: 'sawyer@lost.com',
                    date: '2020-07-23'
                }
            }
        })).toEqual({
            data: [{
                "formData": {
                "date": "2020-07-23",
                "email": "sawyer@lost.com",
                "name": "Robert",
                "surname": "Olbrychowski",
                },
                "id": 4,
    }],
        loading: false
    })
    });
})