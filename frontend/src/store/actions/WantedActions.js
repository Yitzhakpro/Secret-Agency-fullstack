const API_ADDRESS = 'http://localhost:4000'; // Change this if you want.


// handle errors function.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}


// fetching wanted list from db proccess.
export const fetchWantedsBegin = () => {
    return {
        type: 'FETCH_WANTEDS_BEGIN'
    }
};

export const fetchWantedsSuccess = (wanteds) => {
    return {
        type: 'FETCH_WANTEDS_SUCCESS',
        payload: { wanteds }
    }
};

export const fetchWantedsFailure = (error) => {
    return {
        type: 'FETCH_WANTEDS_FAILURE',
        payload: {error}
    }

}

// function to fetch the wanted list from the db
export function fetchWanteds() {
    const API_ENDPOINT = API_ADDRESS + '/fetchWanteds';

    return (dispatch) => {
        dispatch(fetchWantedsBegin());
        return fetch(API_ENDPOINT)
            .then(handleErrors)
            .then(res => res.json())
            .then(result => {
            
                dispatch(fetchWantedsSuccess(result));
                return result
            })
            .catch((err) => dispatch(fetchWantedsFailure(err)));
    }
}


// adding wanted proccess.
export const addWantedBegin = () => {
    return {
        type: 'ADD_WANTED_BEGIN'
    }
};

export const addWantedSuccess = (wantedAdded) => {
    return {
        type: 'ADD_WANTED_SUCCESS',
        payload: wantedAdded
    }
};

export const addWantedFailure = (error) => {
    return {
        type: 'ADD_WANTED_FAILURE',
        payload: {error}
    }

}

// functin to add wanted to the db (new wanted recived as a param)
export function addWanted(newWanted) {
    const API_ENDPOINT = API_ADDRESS + '/addWanted';

    return (dispatch) => {
        dispatch(addWantedBegin());
        return fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newWanted)
        })
        .then(res => res.json())
        .then(result => {
            // console.log(result);

            if(result.hasOwnProperty('errors')) {
                dispatch(addWantedFailure(result))
            } else {
                dispatch(addWantedSuccess(result));
            }
            return result
        })
        .catch((err) => dispatch(addWantedFailure(err)));
    }
}


// delete wanted proccess
export const deleteWantedSuccess = (id) => {
    return {
        type: 'DELETE_WANTED_SUCCESS',
        payload: id
    }
};

// function to delete wanted from the db, given id as a param.
export function deleteWanted(id) {
    const API_ENDPOINT = API_ADDRESS + '/deleteWanted';

    return dispatch => {
        return fetch(API_ENDPOINT, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        })
        .then(res => res.json())
        .then(result => {
            const { deleted } = result;

            if(deleted) {
                dispatch(deleteWantedSuccess(id));
            } else {
                alert("Could not deleted.");
            }
            
            return result
        })
        .catch(err => alert("Server is not responding."));
    }
}