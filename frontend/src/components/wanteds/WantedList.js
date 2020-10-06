import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import WantedSummary from './WantedSummary';
import { fetchWanteds, deleteWanted } from '../../store/actions/WantedActions';
import { checkLogin } from '../../store/actions/AuthActions';

class WantedList extends Component {

    componentDidMount() {
        this.props.fetchWanteds();
        this.props.checkLogin();
    }

    render() {
        const {wanteds, loading, error, logedIn, rank} = this.props;
        const isAdmin = rank === 'admin' || rank === 'owner' ? true : false; // check if the user is admin or owner.

        if (!logedIn) return <Redirect to='/login'/>

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

        if (error) {
            return (
                <div className="loadingList-error">
                    <h1>Failed To Load The Wanted List</h1>
                    <h2>Please Contact The Owner!</h2>
                </div>
            )
        } 

        if (wanteds) {

            if(isAdmin) {
                //if the user has premission, returns the list with delete button on every card.
                return (
                    <div id='wanted-list'>
                    {wanteds && wanteds.map(wanted => {
                        return (
                            <div className='wanted-card' key={wanted._id}>
                                <WantedSummary key={wanted._id} wanted={wanted} />
                                <button onClick={ () => this.props.deleteWanted({id: wanted._id}) }>Remove Wanted</button>
                            </div>
                        )
                    })}
                    </div>
                )

            } else {
                return (
                    <div id='wanted-list'>
                        {wanteds && wanteds.map(wanted => {
                            return (
                                <div className='wanted-card' key={wanted._id}>
                                    <WantedSummary key={wanted._id} wanted={wanted} />
                                </div>
                            )
                        })}
                    </div>
                )
            }

        }
    }
    
}


const mapStateToProps = (state) => {
    return {
        wanteds: state.wanted.wanteds,
        loading: state.wanted.loading,
        error: state.wanted.errors,
        logedIn: state.auth.logedIn,
        rank: state.auth.rank
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchWanteds: () => { dispatch(fetchWanteds()) }, // function to send api request to fetch all the wanteds from the db.
        checkLogin: () => { dispatch(checkLogin()) }, // function to send api request to check if the user is logged in.
        deleteWanted: (id) => { dispatch(deleteWanted(id)) } // function to send api post request to delete wanted with given ID.
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WantedList);