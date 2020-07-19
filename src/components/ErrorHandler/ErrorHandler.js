import React from 'react';
import Aux from '../AuxComponent/AuxComponent';
import Modal from '../../components/UI/Modal/Modal';
import useAxiosErrorHandler from './axios-error';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {

        const [error, clearError] = useAxiosErrorHandler(axios);
        return (
            <Aux>
                <Modal
                    show={error}
                    modalClosed={clearError}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props}/>
            </Aux>
        );
    }
};

export default withErrorHandler;