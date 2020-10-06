import authReducer from './authReducer';
import wantedReducer from './wantedReducer';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
    auth: authReducer,
    wanted: wantedReducer
});

export default rootReducer;