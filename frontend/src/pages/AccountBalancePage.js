import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import { checkBalance } from '../blockchain';

function AccountBalancePage() {
  const [currentBalance, setBalance] = useState(null);

  const showBalance = async () => {
    try {
      const result = await checkBalance(localStorage.getItem("userAddress"));
      setBalance(result);
    } catch (error) {
      console.error('Error fetching balance:', error);
      alert('Error fetching balance. Please try again.');
    }
  };

  return (
    <div className='dashboard-container'>
      <Sidebar />
      <div className='background-image'>
        <div className="myhousecard text">
          <button onClick={showBalance} className='btn'>Click Me</button>
          <div className="padding">Current Balance: {currentBalance !== null ? currentBalance : 'Loading...'}ETH</div>
        </div>
      </div>
    </div>
  );
}

export default AccountBalancePage;
