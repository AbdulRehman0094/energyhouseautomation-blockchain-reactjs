import React from 'react'
import Sidebar from '../Sidebar'

function AccountBalancePage({currentBalance,amountPayable}) {
  return (
    <div className='dashboard-container'>
      <Sidebar />
      <div className='background-image'>
          <div className="myhousecard text ">
            <div className="padding ">Current Balance: {currentBalance}</div>
            <div className="padding">Payable:{amountPayable}</div>
            {/* <div className="padding">Energy Bought:{energyConsumption}</div>
            <div className="padding">Energy Sold:{energyConsumption}</div>
         */}
        </div>
      </div>
    </div>
  )
}

export default AccountBalancePage