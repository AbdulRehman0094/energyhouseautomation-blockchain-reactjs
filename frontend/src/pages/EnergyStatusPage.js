import React from 'react'

function EnergyStatusPage({ energyProduced, energyConsumed }) {
  return (
    <div className="card text">

      <div className="">Enery Produced: {energyProduced}</div>
      <div className=''>Energy Consumed:{energyConsumed}</div>
    </div>)
}

export default EnergyStatusPage