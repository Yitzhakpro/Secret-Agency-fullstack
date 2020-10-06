import React from 'react';


const WantedSummary = ({wanted}) => {

    return (
        <div className='wanted-card-content' key={wanted._id}>
            <p> <span>Name: </span> {wanted.name}</p>
            <p> <span>Age: </span> {wanted.age}</p>
            <p> <span>Short Description: </span> {wanted.short_description}</p>
            <p> <span>Bounty: </span> {wanted.bounty} $</p>
        </div>
    )
}

export default WantedSummary;