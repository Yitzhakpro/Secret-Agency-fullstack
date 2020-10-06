const API_ADDRESS = 'http://localhost:4000'; // Change this if you want.


// handle errors function
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}


//fetching users for owner's users list proccess
export const fetchUsersBegin = () => {
    return {
        type: 'FETCH_USERS_BEGIN'
    }
};

export const fetchUsersSuccess = (users) => {
    return {
        type: 'FETCH_USERS_SUCCESS',
        payload: { users }
    }
};

export const fetchUsersFailure = (error) => {
    return {
        type: 'FETCH_USERS_FAILURE',
        payload: {error}
    }

}

// function that fetches the users for the owner from the db
export function fetchUsers() {
    const API_ENDPOINT = API_ADDRESS + '/fetchUsers';

    return (dispatch) => {
        dispatch(fetchUsersBegin());
        return fetch(API_ENDPOINT, {
                credentials: 'include'
            })
            .then(handleErrors)
            .then(res => res.json())
            .then(result => {
                dispatch(fetchUsersSuccess(result));
                return result
            })
            .catch((err) => dispatch(fetchUsersFailure(err)));
    }
}


// sign up proccess.
export const signUpBegin = () => {
    return {
        type: 'SIGNUP_BEGIN'
    }
};

export const signUpSuccess = (newUser) => {
    return {
        type: 'SIGNUP_SUCCESS',
        payload: newUser
    }
};

export const signUpFailure = (error) => {
    return {
        type: 'SIGNUP_FAILURE',
        payload: {error}
    }
};

// function to sign up the user. (reaching api endpoint)
export function signup(newUser) {
    const API_ENDPOINT = API_ADDRESS + '/signup';

    return disaptch => {
        disaptch(signUpBegin());
        return fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser),
            credentials: 'include'
        })
        .then(res => res.json())
        .then(result => {

            if(result.hasOwnProperty('errors')) {
                disaptch(signUpFailure(result));
            } else {
                disaptch(signUpSuccess(result));
            }
            return result;
        })
        .catch((err) => disaptch(signUpFailure(err)));
    }
};


// login proccess.
export const logInBegin = () => {
    return {
        type: 'LOGIN_BEGIN'
    }
};

export const logInSuccess = (user) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: user
    }
};

export const logInFailure = (error) => {
    return {
        type: 'LOGIN_FAILURE',
        payload: {error}
    }
};

// function to log in the user. (reaching api endpoint)
export function login(user) {
    const API_ENDPOINT = API_ADDRESS + '/login';

    return dispatch => {
        dispatch(logInBegin());
        return fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
            credentials: 'include'
        })
        .then(res => res.json())
        .then(result => {
            // console.log(result);

            if(result.hasOwnProperty('errors')) {
                dispatch(logInFailure(result))
            } else {
                dispatch(logInSuccess(result))
            }

            return result
        })
        .catch(err => dispatch(logInFailure(err)));
    }
};


// logout proccess.
export const logOutSuccess = () => {
    return {
        type: 'LOGOUT_SUCCESS'
    }
}

// function to logout user (reaching api endpoint).
export function logout() {
    const API_ENDPOINT = API_ADDRESS + '/logout';

    return dispatch => {
        return fetch(API_ENDPOINT, {
            method: 'POST',
            credentials: 'include',
        })
        .then(res => res.json())
        .then(result => {
            dispatch(logOutSuccess());
        })
        .catch(err => console.log('SERVER IS NOT RESPONDING'));
    }
}


// check if user logged in proccess.
export const logedIn = (info) => {
    return {
        type: 'USER_LOGEDIN',
        payload: info
    }
};

export const notLogedIn = (info) => {
    return {
        type: 'USER_NOT_LOGEDIN',
        payload: info
    }
};

// function to check if user is logged in (reaching api endpoint to check).
export function checkLogin() {
    const API_ENDPOINT = API_ADDRESS + '/checkLogin';

    return dispatch => {
        return fetch(API_ENDPOINT, {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(result => {
            // console.log(result);

            if(result.logedIn === true){
                dispatch(logedIn(result));
            } else { 
                dispatch(notLogedIn(result));
            }
            
        })
        .catch(err => console.log(err));
    }
}
