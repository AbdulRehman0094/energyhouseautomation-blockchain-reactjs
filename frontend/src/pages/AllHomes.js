import React from 'react'

function AllHomes({ address, name, energyProduced,energyConsumed }) {

    return (
        
       
            <div className="card-flow text">
                <div className="">House Name: {name}</div>
                <div className="">House Address:{address}</div>
                <div className="">Enery Produced: {energyProduced}</div>
                <div className=''>Energy Consumed:{energyConsumed}</div>
            </div>
    )
}

export default AllHomes