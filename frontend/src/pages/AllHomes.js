import React from 'react'

function AllHomes({ address, name, energyProduced,energyConsumed }) {

    return (
        
       <div className=''>
            <div className="card-flow text addedStyles ">
                <div className="">House Name: <span className='styles'>{name}</span></div>
                <div className="">House Address:<span  className='styles'>{address}</span></div>
                <div className="">Enery Producing: <span  className='styles'>{energyProduced}</span></div>
                <div className=''>Energy Consuming:<span  className='styles'>{energyConsumed}</span></div>
            </div>
    </div>)
}

export default AllHomes