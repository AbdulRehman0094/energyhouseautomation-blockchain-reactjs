import React from 'react'
import Sidebar from '../Sidebar'
function EnergyStatusPage({energyProduction, energyConsumption}) {
  return (
   <div className='dashboard-container'>
      <Sidebar />
      <div className='background-image'>
          <div className="myhousecard text ">
            <div className="padding ">Energy Production: {energyProduction}</div>
            <div className="padding">Energy Consumption:{energyConsumption}</div>
            <div className="padding">Energy Bought:{energyConsumption}</div>
            <div className="padding">Energy Sold:{energyConsumption}</div>
        
        </div>
      </div>
    </div>  )
}

export default EnergyStatusPage