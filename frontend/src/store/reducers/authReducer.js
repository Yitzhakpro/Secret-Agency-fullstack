const initState = {
    // login / signup / checking logedIn stuff
    logedIn: false,
    user: {},
    rank: '',

    // general errors
    errors: '',

    // fetching users stuff
    loading: false,
    users: [],
}

const authReducer = (state=initState, action) => {

    switch (action.type) {
        // fetching users action types.
        case 'FETCH_USERS_BEGIN':
            return {
                ...state,
                loading: true,
                errors: ''
            }
        
        case 'FETCH_USERS_SUCCESS':
            return {
                ...state,
                loading: false,
                users: action.payload.users
            }

        case 'FETCH_USERS_FAILURE':
            return {
                ...state,
                loading: false,
                errors: action.payload.error,
                users: []
            }


        // signup action types.
        case 'SIGNUP_BEGIN':
            return {
                ...state,
                errors: '',
            }

        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                logedIn: true,
                user: action.payload,
                rank: action.payload.user.rank
            }

        case 'SIGNUP_FAILURE':
            return {
                ...state,
                logedIn: false,
                errors: action.payload.error,
                user: {},
                rank: ''
            }

        
        // login action types.
        case 'LOGIN_BEGIN':
            return {
                ...state,
                errors: ''
            }

        case 'LOGIN_SUCCESS':
            return {
                ...state,
                logedIn: true,
                user: action.payload,
                rank: action.payload.user.rank
            }

        case 'LOGIN_FAILURE':
            return {
                ...state,
                logedIn: false,
                errors: action.payload.error,
                user: {},
                rank: ''
            }
        

        // logout action types.
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                logedIn: false,
                user: {},
                rank: ''
            }
        

        // check if user logged in - action types.
        case 'USER_LOGEDIN':
            return {
                ...state,
                logedIn: true,
                rank: action.payload.rank
            }
        
        case 'USER_NOT_LOGEDIN':
            return {
                ...state, 
                logedIn: false,
                user: {},
                rank: ''
            }
        
        default:
            return state;
    }
}

export default authReducer;