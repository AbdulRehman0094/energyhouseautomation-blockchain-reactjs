import React from 'react'

function AllHomes({ address, name, energyProduced,energyConsumed }) {

    return (
        
       <div className=''>
            <div className="card-flow text addedStyles ">
                <h2 className="">House Address:<span  className='styles'>{address}</span></h2>
                <h2 className="">Enery Producing: <span  className='styles'>{energyProduced}</span></h2>
                <h2 className=''>Energy Consuming:<span  className='styles'>{energyConsumed}</span></h2>
                <h2 className="">House Name: <span className='styles'>{name}</span></h2>
            </div>
    </div>)
}

export default AllHomes