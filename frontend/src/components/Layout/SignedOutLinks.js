import React from 'react';
import { NavLink } from 'react-router-dom';


const SignedOutLinks = () => {

    return (
        <div>
            <ul className="right">
                <li><NavLink to='/login'>Login</NavLink></li>
                <li><NavLink to='/signup'>Sign Up</NavLink></li>
            </ul>
        </div>
    )
}

export default SignedOutLinks;