import React from 'react'
import EnergyUsageStatus from './EnergyUsageStatus'
import {useEffect, useState } from 'react';

function RenderStatus() {
    const [houseData, setHouseData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data=[ ];
            // const data = await getAllDustbins();
            setHouseData(data);
          } catch (error) {
            console.error('Error fetching dustbins:', error);
          }
        };
    
        fetchData();
      }, []);

  return (
    <>
      <div className="grid-container">
        {houseData?.map((house) => (
          <EnergyUsageStatus
            key={house.id}
            id={house.id}
            name={house.name}
            energyProduced={house.energyProduced}
            energyConsumed={house.energyConsumed}      
          />
        ))}
      </div>

    </>
  )
}

export default RenderStatus