import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Router from './router'
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;