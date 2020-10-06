import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addWanted } from '../../store/actions/WantedActions';
import { checkLogin } from '../../store/actions/AuthActions';


class AddWanted extends Component {
    state = {
        name: null,
        age: null,
        short_description: null,
        bounty: null,
    }

    componentDidUpdate(prevProps) {
        const errors = this.props.errors ? this.props.errors.errors : '';
        const connectionError = this.props.errors.message ? true : false; // if there's a connection error.
        const wantedBeenAdded = !this.props.errors && this.props.wanteds !== prevProps.wanteds ? true : false; // checking if wanted has been added to the db.

        if (connectionError) this.uniqueError.textContent = "Server's not responding, please contact the owner." 

        if (errors) {
            if (errors.name) this.nameError.textContent = errors.name;
            if (errors.age) this.ageError.textContent = errors.age;
            if (errors.bounty) this.bountyError.textContent = errors.bounty;
            if (errors.unique) this.uniqueError.textContent = errors.unique;
        }

        // if wanted has been added, alerts the client with the added name.
        if (wantedBeenAdded) {
            const wanteds = this.props.wanteds;
            const addedWanted = wanteds[wanteds.length - 1].wanted;
            const addedWantedName = addedWanted.name;

            alert(`Added ${addedWantedName} To The Wanted List.`);
        }


    }

    componentDidMount() {
        this.props.checkLogin();
    }


    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    } 

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addWanted(this.state);


        // reset the input fields and state
        this.setState({
            name: null,
            age: null,
            short_description: null,
            bounty: null
        });
        e.target.reset();

    }

    render() {
        const { rank } = this.props
        const isAdmin = rank === 'admin' || rank === 'owner' ? true : false; // check if the user is admin or owner.

        if (!isAdmin) return <Redirect to='/login' />

        return (
            <div className="addWanted-container">
                <form onSubmit={this.handleSubmit} autoComplete='off' >
                    <h1>Welcome Admin</h1>
                    <h2>Who Do You Want To Target Today?</h2>

                    <p><label htmlFor="name">Name:</label></p>
                    <input type='text' id='name' onChange={this.handleChange} />
                    <div className='name error' ref={text => this.nameError = text}>{null}</div>

                    <p><label htmlFor="age">Age (Type 0 if unknown):</label></p>
                    <input type='number' id='age' onChange={this.handleChange} />
                    <div className='age error' ref={text => this.ageError = text}>{null}</div>

                    <p><label htmlFor="short_description">Short Description(looks, behave, etc...): </label></p>
                    <textarea type='text' id='short_description' onChange={this.handleChange} />

                    <p><label htmlFor="bounty">Bounty:</label></p>
                    <input type='number' id='bounty' onChange={this.handleChange} />
                    <div className='bounty error' ref={text => this.bountyError = text}>{null}</div>

                    <button>Add Wanted To List</button>

                    <div className="unique error" ref={text => this.uniqueError = text}>{null}</div>

                </form>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        wanteds: state.wanted.wanteds,
        loading: state.wanted.loading,
        errors: state.wanted.errors,
        rank: state.auth.rank
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addWanted: (newWanted) => { dispatch(addWanted(newWanted)) }, // adding wanted to the db, the newWanted is from the state (after filling the form).
        checkLogin: () => { dispatch(checkLogin()) } // function to send api request to check if the user is logged in.
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWanted);