import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';
import USMap from './USMap';
import WorldMap from './WorldMap';
import Sources from './Sources';
//import Loading from './Components/Loading';
import Covid from './Components/Covid';

const App = () => {
  return (
  <div>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<WorldMap />} />
        <Route path="/world" element={<WorldMap />} />
        <Route path="/uscases" element={<USMap />} />
        <Route path="/sources" element={<Sources />} />
        <Route path="/covid" element={<Covid/>} /> 
      </Routes>
    </Router>
    {/* <Loading/> */}
  </div>);
}

export default App;
