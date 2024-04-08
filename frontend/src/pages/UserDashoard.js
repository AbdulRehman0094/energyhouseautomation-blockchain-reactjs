import React from 'react';
import Sidebar from '../Sidebar';

function UserDashboard() {
  return (
    <div className='dashboard-container'>
      <Sidebar />
      <div className='background-image'>
        <h1>Welcome {localStorage.getItem("userAddress").toUpperCase()}</h1>
      </div>
    </div>
  );
}

export default UserDashboard;
