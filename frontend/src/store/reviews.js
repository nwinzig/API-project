import { csrfFetch } from "./csrf"

const LOAD_REVIEWS = '/api/LOAD_REVIEWS'

const loadReviews = reviews => ({
    type:LOAD_REVIEWS,
    reviews
})

export const getReviews = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`)

    if(response.ok){
        const data = await response.json()
        dispatch(loadReviews(data.Reviews))
    }
}

const ADD_REVIEW = '/api/ADD_REVIEW'

const addReview = data => ({
    type: ADD_REVIEW,
    data
})

export const createReview = (payload, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if(response.ok){

        const data = await response.json()
        dispatch(addReview(data))
        return data
    }


}

//initial state
const initialState = {}


//reducer
const reviewsReducer = (state = initialState, action) => {
    let newState = {};
    switch(action.type){
        case LOAD_REVIEWS:
        action.reviews.forEach(review => {
            newState[review.id] = review
        });
        return newState;
        case ADD_REVIEW:{
            newState = {...state, [action.data.id]: action.data}
            return newState;}
        default:
            return state

    }
}

export default reviewsReducer;
