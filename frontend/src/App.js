// App.js
import './App.css';
import { Link } from 'react-router-dom'; 
import React, { useState } from 'react';
import HomeRegistrationPage from './pages/HomeRegistration';

function App() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showcard, setcard] = useState(true);


  const registerHandler = () => {
    setShowRegistration(true);
    setcard(false);
  }

  return (
    <div className='home'>
      <div className='overlay'></div>
      <h2>Home Energy Automation</h2>
      <div className='card'>
        {showcard && <><button onClick={registerHandler}>Register Your Home</button>
        <Link to='/energyhomesdata'><button>View Energy Houses</button></Link></>}
        {showRegistration && <HomeRegistrationPage />}
      </div>
    </div>
  );
}

export default App;
