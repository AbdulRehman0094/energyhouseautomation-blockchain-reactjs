import React from 'react'

function AllHomes({ id, name, energyProduced,energyConsumed }) {

    return (
        
        <div className='grid'>
            <div className="card text">
                <div className="">House Number: {id}</div>
                <div className="">House Name:{name}</div>
                <div className="">Enery Produced: {energyProduced}</div>
                <div className=''>Energy Consumed:{energyConsumed}</div>
            </div></div>
    )
}

export default AllHomes