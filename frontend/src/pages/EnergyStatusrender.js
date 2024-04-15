import React from 'react'
import { useState, useEffect } from 'react';
import { getAllHouses } from '../energyhouse';
import Sidebar from '../Sidebar';
import EnergyStatusPage from './EnergyStatusPage'

const EnergyStatusrender = () => {
  const [houseData, setHouseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        debugger;
        const data = await getAllHouses();
        console.log(data)
        const userAddress = localStorage.getItem("userAddress");
        const filteredProducts = data.filter(home => home.houseOwner.toLowerCase() == userAddress.toLowerCase());
        setHouseData(filteredProducts);
        console.log(filteredProducts);
      } catch (error) {
        console.error('Error fetching homes:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className='dashboard-container'>
        <Sidebar />
        <div className='background-image'>
          <div className="grid">
            {houseData?.map((house) => (
              <EnergyStatusPage
                energyProduced={house.energyProduction?.toString()}
                energyConsumed={house.energyConsumption?.toString()}
                bought={house.boughtFromGrid?.toString()}
                sold={house.soldToGrid?.toString()}
              />
            ))}
          </div>
        </div>
      </div>
    </>

  )
}

export default EnergyStatusrender