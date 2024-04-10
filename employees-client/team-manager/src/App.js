import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MyEmployees from './components/employees';
import Login from './components/login';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import AddEmployee from './components/addEmployee';
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/myEmployees" element={<MyEmployees />} />
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/addEmployee" element={<AddEmployee/>} />
            </Routes>
        </BrowserRouter>
        
    );
}

export default App;
