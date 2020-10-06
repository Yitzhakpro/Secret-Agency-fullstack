import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/actions/AuthActions';


const LogedInLinks = (props) => {

    const { rank } = props; // rank of the user.

    if(rank === 'owner') {
        return (
            <div className="container">
                <ul className="right">
                    <li><NavLink to='/OwnerPanel'>Owner Panel</NavLink></li>
                    <li><NavLink to='/wanted-list'>Wanted List</NavLink></li>
                    <li><NavLink to='/add-wanted'>Add Wanted</NavLink></li>
                    <li><a href='/' onClick={props.logout}>Sign Out</a></li>
                </ul>
            </div>
        )

    } else if(rank === 'admin') {
        return (
            <div>
                <ul className="right">
                    <li><NavLink to='/wanted-list'>Wanted List</NavLink></li>
                    <li><NavLink to='/add-wanted'>Add Wanted</NavLink></li>
                    <li><a href='/' onClick={props.logout}>Sign Out</a></li>
                </ul>
            </div>
        )

    } else {
        return (
            <div>
                <ul className="right">
                    <li><NavLink to='/wanted-list'>Wanted List</NavLink></li>
                    <li><a href='/' onClick={props.logout}>Sign Out</a></li>
                </ul>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        rank: state.auth.rank
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => { dispatch(logout()) } // function to send api request to log out the user.
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogedInLinks);