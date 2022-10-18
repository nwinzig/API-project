import { csrfFetch } from "./csrf"

const LOAD_SPOTS = '/api/spots'

const loadSpots = spots => ({
    type:LOAD_SPOTS,
    spots
})

export const getSpots = () => async dispatch => {
    const response = await fetch('/api/spots')

    if(response.ok){
        const spots = await response.json()
        dispatch(loadSpots(spots))
    }
}

// const LOAD_SPOT = '/api/spots/:spotId'

// const loadSpot = spot => ({
//     type:LOAD_SPOT,
//     spot
// })

const LOAD_SPOT = 'spots/LOAD_SPOT'

const loadOneSpot = data => ({
    type: LOAD_SPOT,
    data
})

export const getSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`)

    if(response.ok){
        const data = await response.json()
        dispatch(loadOneSpot(data))
        return data
    }
}

//initial state
const initialState = {}


//reducer
const spotReducer = (state = initialState, action) => {
    let newState = {};
    switch(action.type){
        case LOAD_SPOTS:
        action.spots.Spots.forEach(spot => {
            newState[spot.id] = spot
        });
        return newState;
        case LOAD_SPOT:
        newState = {...state}
        newState = action.data
        return newState
        default:
            return state

    }
}

export default spotReducer;
