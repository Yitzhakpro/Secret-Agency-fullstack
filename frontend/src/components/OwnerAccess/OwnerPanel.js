import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkLogin } from '../../store/actions/AuthActions';


class OwnerPanel extends Component {

    componentDidMount() {
        this.props.checkLogin();
    }

    render() {
        const { rank } = this.props
        if(rank !== 'owner') return <Redirect to='/'/> // if the user connected isn't the owner, redirect to home screen.

        return (
            <div id='owner-panel'>
                <h1>~ Owner Panel ~</h1>
                <h2>THE POWER IS IN YOUR HANDS</h2>
                
                <hr />

                <div className='links'>
                    <div id='users-list-link'>
                        <img src='https://www.iconfinder.com/data/icons/small-n-flat/24/user-group-512.png' alt='users-list'/>
                        <button><Link to='/OwnerPanel/UsersList'>Users List</Link></button>
                    </div>

                    <div id='manage-users-link'>
                    <img src='https://icon-library.com/images/manage-icon-png/manage-icon-png-0.jpg' alt='manage-users'/>
                        <button><Link to='/OwnerPanel/ManageUsers'>Manage Users</Link></button>
                    </div>
                </div>
                
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        logedIn: state.auth.logedIn,
        rank: state.auth.rank
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkLogin: () => { dispatch(checkLogin()) } // function to send api request to check if the user is logged in.
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(OwnerPanel);