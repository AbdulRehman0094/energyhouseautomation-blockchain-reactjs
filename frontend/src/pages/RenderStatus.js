import React from 'react'
import AllHomes from './AllHomes';
import { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';

function RenderStatus() {
  const [houseData, setHouseData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [];
        // const data = await getAllDustbins();
        setHouseData(data);
      } catch (error) {
        console.error('Error fetching homes:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className='home'>
        <div className='overlay'></div>

        <div className="grid-container">
          {houseData?.map((house) => (
            <AllHomes
              key={house.id}
              id={house.id}
              name={house.name}
              energyProduced={house.energyProduced}
              energyConsumed={house.energyConsumed}
            />
          ))}
        </div>

      </div>

      

    </>
  )
}

export default RenderStatus