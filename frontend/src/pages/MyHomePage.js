import React from 'react';
import Sidebar from '../Sidebar';

function MyHomePage({ id, name }) {
  return (
    <>
    <div className='dashboard-container'>
      <Sidebar />
      <div className='background-image'>
          <div className="myhousecard text ">
            <div className="padding ">House Number: {id}</div>
            <div className="padding">House Name:{name}</div>
         
        </div>
      </div>
    </div>
    </>
  );
}

export default MyHomePage;
