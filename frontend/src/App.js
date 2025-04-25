import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Landing from "./components/Landing";
import Complaints from "./components/Complaints";
import ManageStudents from "./components/ManageStudents";
import './App.css';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <div className="navbar-title">
          <img src="/assets/nit-white.png" alt="App Icon" className="navbar-icon" />
          NITJSR
        </div>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/manage">Manage Students</Link>
          <Link to="/complaints">Complaints</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/manage" element={<ManageStudents />} />
      </Routes>
    </Router>
  );
}

export default App;
