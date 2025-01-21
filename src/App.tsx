import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css'
import apiService from './services/apiServices';
import Home from './pages/home';
import LogIn from './pages/login';
import Dashboard from './pages/dashbord';
// import LogIn from './pages/login';


function App() {

  const data = () => {
    apiService.signUp()
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
