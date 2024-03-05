import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React from 'react';
import { Home } from './views/home/Home';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/home' element={<Home/>} />
      </Routes> 
    </Router>
  );
}

export default App;
