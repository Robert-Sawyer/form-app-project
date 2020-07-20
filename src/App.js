import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Layout from "./components/UI/Layout/Layout";
import MainForm from "./components/ContactForm/MainForm";
import FinalPage from "./components/FinalPage/FinalPage";

const App = () => {
  return (
    <div>
      <Layout>
          <Switch>
              <Route path="/final" component={FinalPage}/>
              <Route path="/" exact component={MainForm}/>
          </Switch>
      </Layout>
    </div>
  );
}

export default App;
