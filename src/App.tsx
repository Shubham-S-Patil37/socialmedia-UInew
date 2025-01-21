
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css'
import Home from './pages/home';
import LogIn from './pages/login';
import Dashboard from './pages/dashbord';
// import LogIn from './pages/login';


function App() {


  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<LogIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
