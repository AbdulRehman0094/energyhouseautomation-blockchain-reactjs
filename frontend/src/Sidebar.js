import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div>
            <>
                <div className='sidebar'>
                    <div className='heading'>
                        <h2>Dashboard</h2>
                    </div>
                    <Link to='/dashboard/userhome' className='link'>
                        <div className='flex menu'>
                            My Home
                            <img src='/homeicon.png' alt='Dashboard' />
                        </div>
                    </Link>
                    <Link to='/energystatus' className='link'>
                        <div className='flex menu'>
                            Energy Status
                            <img src='/pngegg.png' alt='Dashboard' />
                        </div>
                    </Link>
                    <Link to='/accountbalance' className='link'>
                        <div className='flex menu'>
                            Account Balance
                            <img src='/dollar.png' alt='Dashboard' />
                        </div>
                    </Link>
                </div>
            </>
        </div>
    )
}

export default Sidebar
