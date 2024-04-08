import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeRegistrationPage from './pages/HomeRegistration';
import RenderStatus from './pages/RenderStatus';
import UserDashoard from './pages/UserDashoard';
import MyHomePage from './pages/MyHomePage';
import EnergyStatusPage from './pages/EnergyStatusPage';
import AccountBalancePage from './pages/AccountBalancePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/dashboard/userhome' element={<MyHomePage />} />
        <Route path='/energystatus' element={<EnergyStatusPage />} />
        <Route path='/accountbalance' element={<AccountBalancePage />} />
        <Route path='/dashboard' element={<UserDashoard />} />
        <Route path='/energyhomesdata' element={<RenderStatus />} />
        <Route path='/' element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
