import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';
import USMap from './USMap';
import WorldMap from './WorldMap';
import Sources from './Sources';
//import Loading from './Components/Loading';
import WorldCovidTable from './Components/Covid';
import USCovidTable from './Components2/Covid'

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
        <Route path="/worldcovidtable" element={<WorldCovidTable/>} /> 
        <Route path="/uscovidtable" element={<USCovidTable/>} />
      </Routes>
    </Router>
    {/* <Loading/> */}
  </div>);
}

export default App;
