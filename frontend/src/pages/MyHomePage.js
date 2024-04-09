import React from 'react';

function MyHomePage({ name, address }) {
  return (
    <>

   <div className="card text">
                <div className="">House Name: {name}</div>
                <div className="">House Address:{address}</div>            
            </div>
    </>
  );
}

export default MyHomePage;
