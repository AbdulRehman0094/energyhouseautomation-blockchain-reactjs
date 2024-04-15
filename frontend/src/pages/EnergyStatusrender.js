import React from 'react'
import { useState, useEffect } from 'react';
import { getAllHouses } from '../blockchain';
import Sidebar from '../Sidebar';
import EnergyStatusPage from './EnergyStatusPage'

const EnergyStatusrender = () => {
  const [houseData, setHouseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllHouses();
        console.log(data)
        const userAddress = localStorage.getItem("userAddress");
        console.log(userAddress)
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
                energyProduced={house.energyProduction.toString()}
                energyConsumed={house.energyConsumption.toString()}
              />
            ))}
          </div>
        </div>
      </div>
    </>

  )
}

export default EnergyStatusrender