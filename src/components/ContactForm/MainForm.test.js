import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MainForm from "./MainForm";
import Spinner from "../UI/Spinner/Spinner";
import {createStore, combineReducers} from "redux";
import sendFormReducer from '../../store/reducers/sendForm';
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

configure({adapter: new Adapter()});

const rootReducer = combineReducers({
    sendForm: sendFormReducer
});

describe('<MainForm/>', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<MainForm store={createStore(rootReducer)}/>);
    });

    it('should render <Button/>', () => {
        expect(wrapper.find(Button));
    });

    it('should render <Input/>', () => {
        expect(wrapper.find(Input));
    });

    it('should not show Spinner when form is not loading', () => {
        wrapper.setProps({loading: false});
        expect(wrapper.contains(<Spinner/>)).toEqual(false);
    });

});