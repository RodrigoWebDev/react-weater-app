import React from 'react';
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import './App.css';


const App = () => {
  return (
    <div className="_App">
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}

export default App
