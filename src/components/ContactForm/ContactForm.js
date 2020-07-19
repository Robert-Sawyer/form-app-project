import React, {useState} from 'react';
import {connect} from 'react-redux';
import classes from './ContactForm.module.css';
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Spinner from "../UI/Spinner/Spinner";
import axios from '../../axios-orders';
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import * as actions from '../../store/actions/index';

const ContactForm = props => {

    const [mainForm, setMainForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Imię'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        surname: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Nazwisko'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'E-mail'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        eventDate: {
            elementType: 'input',
            elementConfig: {
                type: 'date',
            },
            value: '',
            validation: {
                required: true
            },
            valid: false
        }
    });
    const [formIsValid, setFormIsValid] = useState(false);

    const sendFormHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in mainForm) {
            formData[formElementIdentifier] = mainForm[formElementIdentifier].value;
        }
        const data = {
            customerData: formData,
        };

        props.onSendForm(data);
    };

    const checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    };

    const inputChangedHandler = (event, inputIdentifier) => {

        const updatedOrderForm = {
            ...mainForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;

        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        console.log(updatedFormElement);

        updatedFormElement.touched = true;

        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        setMainForm(updatedOrderForm);
        setFormIsValid(formIsValid);
    };

    const formElementsArray = [];
    for (let key in mainForm) {
        formElementsArray.push({
                id: key,
                config: mainForm[key]
            }
        );
    }
    let form = (
        <form onSubmit={sendFormHandler}>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)}/>
            ))}
            <Button btnType="Success" disabled={!formIsValid}>SEND</Button>
        </form>
    );
    if (props.loading) {
        form = <Spinner/>
    }
    return (
        <div className={classes.ContactData}>
            <h4>Wprowadź swoje dane kontaktowe:</h4>
            {form}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.sendForm.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSendForm: (data) => dispatch(actions.sendForm(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(ContactForm, axios));