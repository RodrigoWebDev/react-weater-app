/*
  - Colocar o Loader para a pagina inteira, tentar trazer o loader e as chamadas da API em Context.js
*/

import React from 'react';
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { ContextProvider } from "./components/Context"
import './App.css';


const App = () => {
  return (
    <div className="_App">
      <ContextProvider>
        <Navbar />
        <Main />
        <Footer />
      </ContextProvider>
    </div>
  );
}

export default App
