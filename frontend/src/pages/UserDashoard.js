import React from 'react';
import Sidebar from '../Sidebar';

function UserDashboard() {
  return (
    <div className='dashboard-container'>
      <Sidebar />
      <div className='background-image'>
        <h1>Welcome </h1><span className='bold'>{localStorage.getItem("userAddress").toUpperCase()}</span>
      </div>
    </div>
  );
}

export default UserDashboard;
