import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/home/Home';
import LoanCalc from './pages/loancalc/LoanCalc';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Weather from './pages/weather/Weather';


const App = () => {
    const cUser = useSelector((state)=>state.user.currentUser);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/loancalc" element={(cUser!==null)?<LoanCalc />:<Login />} />
                <Route path="/weather" element={<Weather />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </Router>
    )
}

export default App