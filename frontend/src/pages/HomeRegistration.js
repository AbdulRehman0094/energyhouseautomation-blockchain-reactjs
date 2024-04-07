import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function HomeRegistrationPage() {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    productionCapacity: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const [hide, setHide] = useState(false);
  const registerHandler = () => {
    setHide(true);
    console.log(hide)

  }

  return (
    <>
      <div className="form-container">
        <div className='bgimg'></div>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label>
            House Number:
            <input type="text" name="number" value={formData.number} onChange={handleChange} />
          </label>
          <Link to='/dashboard'>
            <button type="submit" onClick={registerHandler} className='register-button'>Register</button>
          </Link>
        </form>

      </div>

    </>
  );
}

export default HomeRegistrationPage;
