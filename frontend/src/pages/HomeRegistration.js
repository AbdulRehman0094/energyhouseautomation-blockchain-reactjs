import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addHouse } from "../blockchain";
import { isOwnerExist } from "../blockchain";
import { registerOwner } from "../blockchain";
import { useNavigate } from "react-router-dom";

function HomeRegistrationPage() {
  const gridaddress = "0x591D8c585558b2cCa052A9B8e042d3EffA379deA";
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const navigate= useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleUserAddressChange = (e) => {
    setUserAddress(e.target.value);
  };

  const isFormEmpty = () => {
    return !name.trim() && !address.trim() && !userAddress.trim();
  };

  const isFormFilled = () => {
    return name.trim() && address.trim() && userAddress.trim();
  };

  const [hide, setHide] = useState(false);

  const registerHandler = async () => {
    try {
      localStorage.setItem("userAddress", userAddress);
      const result= await isOwnerExist(userAddress)
      if(result){
        alert('Already Registered. Cannot Register Again!')
      }
      else{
        await registerOwner(name, userAddress);
        await addHouse(name, address, gridaddress, userAddress);
        alert('House Succefully Registered!')

      }
      setHide(true);
    } catch (error) {
      console.log('error')
    }
  };

  return (
    <>
      <div className="form-container">
        <div className="bgimg"></div>
        <form>
          <label>
            Name:
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
          <label>
            House Address:
            <input type="text" value={address} onChange={handleAddressChange} />
          </label>
          <label>
            User Address:
            <input
              type="text"
              value={userAddress}
              onChange={handleUserAddressChange}
            />
          </label>
          <Link to="/dashboard" className="comp">
            <button
              type="submit"
              onClick={registerHandler}
              className="register-button"
              disabled={!isFormEmpty() && !isFormFilled()}
            >
              Register
            </button>
          </Link>
        </form>
      </div>
    </>
  );
}

export default HomeRegistrationPage;
