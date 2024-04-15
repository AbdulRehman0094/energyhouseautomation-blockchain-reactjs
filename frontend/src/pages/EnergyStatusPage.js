import React from 'react'

function EnergyStatusPage({ energyProduced, energyConsumed,bought,sold }) {
  return (
    <div className="card cardnew text">

      <div className="">Enery Produced: {energyProduced}</div>
      <div className=''>Energy Consumed:{energyConsumed}</div>
      <div className=''>Energy Sold:{sold}</div>
      <div className=''>Energy Bought:{bought}</div>

    </div>)
}

export default EnergyStatusPage