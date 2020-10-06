import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { checkLogin, login } from '../../store/actions/AuthActions';


class LogIn extends Component {
    state = {
        email: '',
        password: ''
    }

    componentDidUpdate(prevProps) {
        const errors = this.props.errors ? this.props.errors.errors : '';
        const connectionError = this.props.errors.message ? true : false; // server connectin error.

        if (connectionError) this.uniqueError.textContent = "Server's not responding, please contact the owner."

        if (errors) {
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
        this.props.login(this.state);

        this.emailError.textContent = '';
        this.passwordError.textContent = '';
        this.uniqueError.textContent = '';
    }


    render() {
        const { logedIn } = this.props;
        if (logedIn) return <Redirect to='/' /> // if user loged in, redirect to the home screen.

        return (
           <div className="login-signup-form">

               <form onSubmit={this.handleSubmit}>
                    <h1>Log In</h1>
                    
                    <p><label htmlFor="email">Email:</label></p>
                    <input type="email" id="email" placeholder='Enter An Email' onChange={this.handleChange} />
                    <div className='email error' ref={text => this.emailError = text}>{null}</div>

                    <p><label htmlFor="password">Password:</label></p>
                    <input type='password' id='password' placeholder='Enter A Password' onChange={this.handleChange} />
                    <div className='password error' ref={text => this.passwordError = text}>{null}</div>

                    <button>Log In</button>

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
        login: (user) => { dispatch(login(user)) }, // function to send api request to log in the user.
        checkLogin: () => { dispatch(checkLogin()) } // function to send api request to check if the user is logged in.
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);