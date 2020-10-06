const initState = {
    loading: false,
    wanteds: [],
    errors: ''
} 

const wantedReducer = (state = initState, action) => {

    switch(action.type){
        // fetching wanteds action types
        case 'FETCH_WANTEDS_BEGIN':
            return {
                ...state,
                loading: true,
                errors: ''
            };
        
        case 'FETCH_WANTEDS_SUCCESS':
            return {
                ...state,
                loading: false,
                wanteds: action.payload.wanteds
            }

        case 'FETCH_WANTEDS_FAILURE':
            return {
                ...state,
                loading: false,
                errors: action.payload.error,
                wanteds: []
            }


        // adding wanted action types.
        case 'ADD_WANTED_BEGIN':
            return {
                ...state,
                loading: true,
                errors: ''
            }
        
        case 'ADD_WANTED_SUCCESS':
            return {
                ...state,
                loading: false,
                wanteds: [...state.wanteds, action.payload],
                errors: ''
            }
        
        case 'ADD_WANTED_FAILURE':
            return {
                ...state, 
                loading: false,
                errors: action.payload.error,
                wanteds: []
            }
        

        // delete wanted action types
        case 'DELETE_WANTED_SUCCESS':
            let newList = state.wanteds.filter(wanted => action.payload.id !== wanted._id);
            return {
                ...state,
                wanteds: newList,
                errors: ''
            }

        default:
            return state;
    }
    
}

export default wantedReducer;