import React from 'react';

const UserSummary = ({user, copyID}) => {

    return (
        <div className='user-card-content' key={user._id}>
            <p> <span>Username:</span> {user.username}</p>
            <p> <span>Email:</span> {user.email}</p>
            <p> <span>ID:</span> {user._id}
                <button title='Copy To Clipboard' onClick={() => copyID(user._id)}>&#128203;</button>
            </p>
            <p className={'rank ' + user.rank}> <span>Rank:</span> [{user.rank}]</p>
        </div>
    )
}


export default UserSummary;