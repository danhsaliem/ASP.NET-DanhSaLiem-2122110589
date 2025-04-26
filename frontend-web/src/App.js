import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import Main from './layout/Main';
import Header from './layout/Header';
import Footer from './layout/Footer';
const App = () => {
  return (
    <Router>
      <Header/>
      <Main />
      <Footer/>
    </Router>
  );
}

export default App;
