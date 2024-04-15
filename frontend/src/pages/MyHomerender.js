import React from "react";
import MyHomePage from "./MyHomePage";
import Sidebar from "../Sidebar";
import { useState, useEffect } from "react";
import { getAllHouses } from "../blockchain";

const MyHomerender = () => {
  const [houseData, setHouseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllHouses();
        console.log(data);
        const userAddress = localStorage.getItem("userAddress");
        console.log(userAddress);
        const filteredProducts = data.filter(
          (home) => home.houseOwner.toLowerCase() == userAddress.toString()
        );
        setHouseData(filteredProducts);
        console.log(filteredProducts);
      } catch (error) {
        console.error("Error fetching homes:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="dashboard-container">
        <Sidebar />
        <div className="background-image">
            <div className="grid">
              {houseData?.map((house) => (
                <MyHomePage
                  key={house.id}
                  id={house.houseId}
                  name={house.houseName}
                  address={house.houseAddress}
                />
              ))}
            </div>
        </div>
      </div>
    </>
  );
};

export default MyHomerender;
