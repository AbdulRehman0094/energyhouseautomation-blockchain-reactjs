import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { Route, Routes } from 'react-router-dom/dist/umd/react-router-dom.development';
import MyHomePage from './MyHomePage';
import EnergyStatusPage from './EnergyStatusPage';
import AccountBalancePage from './AccountBalancePage';
import RenderStatus from './RenderStatus';

function UserDashoard() {

  return (
    <div>
      <Sidebar />
      UserDashoard
    </div>
  )
}

export default UserDashoard