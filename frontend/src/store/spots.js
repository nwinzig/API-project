import { csrfFetch } from "./csrf"

const LOAD_SPOTS = '/api/spots'

const loadSpots = spots => ({
    type:LOAD_SPOTS,
    spots
})

export const getSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots')

    if(response.ok){
        const spots = await response.json()
        dispatch(loadSpots(spots))
    }
}

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

const ADD_SPOT = 'spots/ADD_SPOT'

const addSpot = data => ({
    type: ADD_SPOT,
    data
})

export const createSpot = (payload) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if(response.ok){
        const data = await response.json()

        dispatch(addSpot(data))
        return data
    }
}

//initial state
const initialState = {}


//reducer
const spotReducer = (state = initialState, action) => {
    let newState = {};
    switch(action.type){
        case LOAD_SPOTS:{
        action.spots.Spots.forEach(spot => {
            newState[spot.id] = spot
        });
        return newState;}
        case LOAD_SPOT:{
        newState = {...state}
        newState = action.data
        return newState;}
        case ADD_SPOT:{
            newState = {...state, [action.data.id]: action.data}
            return newState;}
        default:
            return state

    }
}

export default spotReducer;
