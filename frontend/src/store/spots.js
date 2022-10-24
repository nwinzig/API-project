import { csrfFetch } from "./csrf"


//get all
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

//get one
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

//create
const ADD_SPOT = 'spots/ADD_SPOT'

const addSpot = data => ({
    type: ADD_SPOT,
    data
})

export const createSpot = (payload, image) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if(response.ok){
        let data = await response.json()
        const spotId = data.id

        const newResponse = await csrfFetch(`/api/spots/${spotId}/images`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(image)
        })

        if(newResponse.ok){
            data = await newResponse.json()
            dispatch(addSpot(data))
            return data
        }
    }
}

//update
const UPDATE_SPOT = 'spots/UPDATE_SPOT'

const update = data => ({
    type: UPDATE_SPOT,
    data
})


export const updateSpot = (payload, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if(response.ok){
        const data = await response.json()
        dispatch(update(data))
        return data
    }
}


//delete
const DELETE_SPOT = 'spots/DELETE_SPOT'

const actionDelete = spotId => ({
    type: DELETE_SPOT,
    spotId
})

export const deleteSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })

    if(response.ok){
        dispatch(actionDelete(spotId))
    }
}

//initial state
const initialState = {}


//reducer
const spotReducer = (state = initialState, action) => {
    let newState = {};
    switch(action.type){
        case LOAD_SPOTS:{
            state = {}
            newState ={}
        action.spots.Spots.forEach(spot => {
            newState[spot.id] = spot
        });
        return newState;}
        case LOAD_SPOT:{

        newState = {}

        newState = action.data
        return newState;
    }
        case ADD_SPOT:{
            newState = {...state, [action.data.id]: action.data}
            return newState;}
        case UPDATE_SPOT:{
            newState = {...state, [action.data.id]: action.data}
            return newState;
        }
        case DELETE_SPOT:{
            newState = {...state}
            delete newState[action.spotId]
            return newState
        }
        default:
            return state

    }
}

export default spotReducer;
