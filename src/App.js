import React from 'react';
import './App.css';
import Layout from "./components/UI/Layout/Layout";
import ContactForm from "./components/ContactForm/ContactForm";
import FinalPage from "./components/FinalPage/FinalPage";

const App = () => {
  return (
    <div>
      <Layout>
        <ContactForm/>
        <FinalPage/>
      </Layout>
    </div>
  );
}

export default App;
