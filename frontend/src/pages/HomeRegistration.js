import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function HomeRegistrationPage() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [userAddress, setUserAddress] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleUserAddressChange = (e) => {
    setUserAddress(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { name, number, userAddress });

    // Set userAddress in localStorage
    localStorage.setItem('userAddress', userAddress);
    // console.log(userAddress)
  };

  const [hide, setHide] = useState(false);
  const registerHandler = () => {
    localStorage.setItem('userAddress', userAddress);
    setHide(true);
    console.log(hide);
    console.log(userAddress)
  };

  return (
    <>
      <div className="form-container">
        <div className='bgimg'></div>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
          <label>
            House Number:
            <input type="text" value={number} onChange={handleNumberChange} />
          </label>
          <label>
            User Address:
            <input type="text" value={userAddress} onChange={handleUserAddressChange} />
          </label>
          <Link to='/dashboard'>
            <button type="submit" onClick={registerHandler} className='register-button'>Register</button>
          </Link>
        </form>
      </div>
    </>
  );
}

export default HomeRegistrationPage;
