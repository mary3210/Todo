import React from 'react';
import Header from './components/Header';
import {Routes, Route } from 'react-router-dom';
import routes from './config/routes';

function App() {
  return (
    <div className="container">
      <header/>
      { routes }
    </div>
  );
};

export default App;