

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


//initial state
const initialState = {}


//reducer
const spotReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_SPOTS:
        const newState = {};
        // console.log('what are you', action.spots)
        // console.log('do you work', action.spots.Spots)
        action.spots.Spots.forEach(spot => {
            newState[spot.id] = spot
        });
        // console.log('looking for all spots object', newState)
        return newState
        default:
            return state

    }
}

export default spotReducer;
