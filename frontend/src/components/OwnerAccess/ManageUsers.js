import React, { Component } from 'react';


const API_ADDRESS = 'http://localhost:4000';

class ManageUsers extends Component {
    state = {
        userID: '',
        username: '',
        currentRank: '',
        error: '',
        show_options: false,

        setRank: 'user'
    }


    // handle change of input and select.
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    }

    // getting the user from the db and saving his info to the state,
    // the id is recived from the owner's input.
    getUser = async (id) => {
        const API_ENDPOINT = API_ADDRESS + '/getUser/' + id;

        return fetch(API_ENDPOINT, {
            credentials: 'include',    
        })
        .then(res => res.json())
        .then(result => {
            
            if(result.found) {
                // if user has been found in the db.
                this.setState({
                    username: result.username,
                    currentRank: result.currentRank,
                    error: '',
                    show_options: true

                });
            } else {
                this.setState({
                    username: '',
                    currentRank: '',
                    error: 'USER NOT FOUND',
                    show_options: false
                });
            }
        })
        .catch(err => {
            this.setState({
                username: '',
                currentRank: '',
                error: "Can't reach server / You didn't type anything",
                show_options: false
            });
        });
    }

    handleClick = async (e) => {
        await this.getUser(this.state.userID);
        
    }

    // change the rank of given user,
    // id is from the input (saved in the state)
    // updatedRank is from the select element (saved in the state).
    changeRank = (id, updatedRank) => {
        const API_ENDPOINT = API_ADDRESS + '/setRank';

        return fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id, rank: updatedRank}),
            credentials: 'include'
        })
        .then(res => res.json())
        .then(result => {
            const { changed } = result; // if rank of the user changed.
            if (changed) {
                alert('Changed Permissions!');
                this.setState({
                    ...this.state,
                    currentRank: this.state.setRank
                });
            }
            else {
                alert("Could Not Change Permissions, check the ID.")
            }
        })
        .catch(err => alert('Server is not responding.'));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        // id of user you want to change his rank.
        // setRank is the desired rank to set to that user.
        const { userID, setRank } = this.state;
        this.changeRank(userID, setRank);
    }

    //  delete user function to delete user with given ID,
    // id is given from the id that has been saved in the state.
    deleteUser = (userID) => {
        const API_ENDPOINT = API_ADDRESS + '/deleteUser/' + userID;  

        return fetch(API_ENDPOINT, {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(result => {
            const { deleted } = result; // if the user has been deleted.
            if(deleted) {
                alert('User has been deleted.');
                this.setState({
                    ...this.state,
                    userID: '',
                    username: '',
                    currentRank: '',
                    error: '',
                    show_options: false
                });

            } else {
                alert("User has not been deleted, check if account exists.");
            }

        })
        .catch(err => alert("Server is not responding."));
    }

    render() {
        return (
            <div id='manage-users'>
                <h1>Manage Users</h1>
                
                <hr />

                <div id='user-find-section'>
                    <label htmlFor="userID">User ID:</label>
                    <input type='text' id='userID' onChange={this.handleChange} />
                    <button onClick={this.handleClick}>Find User</button>

                    {this.state.username && this.state.currentRank &&
                    <div className='user-info'>
                        <p><span>Username:</span> {this.state.username}</p>
                        <p className={'rank ' + this.state.currentRank}><span>Current Rank:</span> [{this.state.currentRank}]</p>
                    </div>
                    }
                    <p id='error-found'>{this.state.error}</p>
                </div>


                {this.state.show_options &&
                <div className='manageUsersOptions'>
                    <hr />
                    <h1>Change Permissions</h1>
                    <form class='changeRank-form' onSubmit={this.handleSubmit}>
                        <label>Choose A Rank:</label>
                        <select name="ranks" id="setRank" value={this.state.setRank} onChange={this.handleChange}>
                            <option value='admin'>admin</option>
                            <option value='user'>user</option>
                        </select>
                        <br/>
                        <button>Change Rank</button>
                    </form>
                    
                    <div className='deleteUser-section'>
                        <hr />
                        <h1>Delete User</h1>
                        <button onClick={() => this.deleteUser(this.state.userID)}>Delete User From The DataBase</button>
                    </div>

                </div>
                }
            </div>
        )
    }
    
}


export default ManageUsers;