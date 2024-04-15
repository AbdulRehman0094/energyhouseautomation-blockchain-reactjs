import React from 'react'
import AllHomes from './AllHomes';
import { useEffect, useState } from 'react';
import { getAllHouses } from '../energyhouse';


function RenderStatus() {

  const [houseData, setHouseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllHouses();
        setHouseData(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching homes:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className='dashboard-container'>       
        <div className='background-image'>
          <div className="gridm">
            {houseData?.map((house) => (
              <AllHomes 
              key={house.id}
              id={house.houseId}
              name={house.houseName}
              address={house.houseAddress}
              energyProduced={house.energyProduction.toString()}
              energyConsumed={house.energyConsumption.toString()}
              houseowner={house.houseOwner}
              />
            ))}
          </div>
        </div>
      </div>
    </>
    
  )
}

export default RenderStatus