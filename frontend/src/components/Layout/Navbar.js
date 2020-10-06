import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogedInLinks from './LogedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { checkLogin } from '../../store/actions/AuthActions';


class Navbar extends Component {
    
    componentDidMount() {
        this.props.checkLogin();
    }

    render() {
        const { logedIn} = this.props;

        // links to display on nav bar.
        // if loged in displas loged in links (links depend on rank of account)
        // else displays signed out links
        let links = logedIn ? <LogedInLinks /> : <SignedOutLinks />;


        return (
            <nav>
                <Link to='/' className='brand-logo'>Secret Agency</Link>
                {links}
            </nav>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);