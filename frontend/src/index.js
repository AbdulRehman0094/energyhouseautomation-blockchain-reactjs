import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RenderStatus from './pages/RenderStatus';
import UserDashoard from './pages/UserDashoard';
import MyHomePage from './pages/MyHomePage';
import AccountBalancePage from './pages/AccountBalancePage';
import MyHomerender from './pages/MyHomerender';
import EnergyStatusrender from './pages/EnergyStatusrender';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
      <Route path='/myhomerender' element={<MyHomerender />} />
        <Route path='/energyrender' element={<EnergyStatusrender />} />
        <Route path='/accountbalanc' element={<AccountBalancePage />} />
        <Route path='/dashboard' element={<UserDashoard />} />
        <Route path='/allhomesrender' element={<RenderStatus />} />
        <Route path='/' element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
