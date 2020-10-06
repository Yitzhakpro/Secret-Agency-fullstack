import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkLogin, signup } from '../../store/actions/AuthActions';


class SignUp extends Component {
    state = {
        username: '',
        email: '',
        password: ''
    }

    componentDidUpdate(prevProps) {
        const errors = this.props.errors ? this.props.errors.errors : '';
        const connectionError = this.props.errors.message ? true : false; // server connectin error.


        if (connectionError) this.uniqueError.textContent = "Server's not responding, please contact the owner."

        if (errors) {
            if (errors.username) this.usernameError.textContent = errors.username;
            if (errors.email) this.emailError.textContent = errors.email;
            if (errors.password) this.passwordError.textContent = errors.password;
            if (errors.unique) this.uniqueError.textContent = errors.unique;
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
        this.props.signup(this.state);

        this.usernameError.textContent = '';
        this.emailError.textContent = '';
        this.passwordError.textContent = '';
        this.uniqueError.textContent = '';
    }


    render() {
        const { logedIn } = this.props;
        if (logedIn) return <Redirect to='/' /> // if user loged in, redirect to the home screen.

        return (
           <div className="login-signup-form signup">
               <form onSubmit={this.handleSubmit}>
                    <h1>Sign Up</h1>
                    
                    <p><label htmlFor="username">Username:</label></p>
                    <input type='text' id='username' placeholder='Enter A Username' onChange={this.handleChange} />
                    <div className='username error' ref={text => this.usernameError = text}>{null}</div>

                    <p><label htmlFor="email">Email:</label></p>
                    <input type="text" id="email" placeholder='Enter An Email' onChange={this.handleChange} />
                    <div className='email error' ref={text => this.emailError = text}>{null}</div>

                    <p><label htmlFor="password">Password:</label></p>
                    <input type='password' id='password' placeholder='Enter A Password' onChange={this.handleChange} />
                    <div className='password error' ref={text => this.passwordError = text}>{null}</div>

                    <button>Sign Up</button>

                    <div className="unique error" ref={text => this.uniqueError = text}>{null}</div>
               </form>
           </div> 
        )
    }
}


const mapStateToProps = (state) => {
    return {
        logedIn: state.auth.logedIn,
        user: state.auth.user,
        errors: state.auth.errors
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signup: (newUser) => { dispatch(signup(newUser)) }, // function to send api request to sign up the user.
        checkLogin: () => { dispatch(checkLogin()) } // function to send api request to check if the user is logged in.
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);