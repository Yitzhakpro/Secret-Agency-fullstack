import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUsers } from '../../store/actions/AuthActions';
import UserSummary from './UserSummary';


class UsersList extends Component {

    componentDidMount() {
        this.props.fetchUsers();
    }

    // copy the id to clipboard function.
    copyID = (id) => {
        let dummy = document.createElement("input");
        document.body.appendChild(dummy);
        dummy.setAttribute("id", "dummy_id");
        dummy.style.height = '0px';
        dummy.style.width = '1px';

        document.getElementById('dummy_id').value =  id;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);

    }


    render() {
        const { loading, users, error, rank } = this.props;
        
        if(rank !== 'owner') return <Redirect to='/'/> // if the user isnt the owner, it redirects the user to the home page.

        
        // loading div for loading the users.
        if (loading) {
            return (
                <div className="loading-list">
                    <span>L</span>
                    <span>O</span>
                    <span>A</span>
                    <span>D</span>
                    <span>I</span>
                    <span>N</span>
                    <span>G</span>
                </div>
            )
        } 

        // if there's a error, it displays the error div.
        if (error) {
            return (
                <div className="loadingList-error">
                    <h1>Failed To Load Users List</h1>
                    <h2>Please Contact The Owner!</h2>
                </div>
            )
        }


        // if users has been added to the state, 
        // returns the users div and stuff.
        if (users) {
            return (
                <div id='users-list'>
                    <h1>Users List</h1>

                    <hr />

                    {users && users.map(user => {
                        return (
                            <div className='user-card' key={user._id}>
                                <UserSummary user={user} copyID={this.copyID}/>
                            </div>
                        )
                    })}
                </div>
            )
        }

    }
}


const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        users: state.auth.users,
        error: state.auth.errors,
        rank: state.auth.rank
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers: () => { dispatch(fetchUsers()) } // function to reach api endpoint to grub the users from the db.
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);