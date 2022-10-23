import { csrfFetch } from "./csrf"


//all reviews for a spot
const LOAD_REVIEWS = '/api/LOAD_REVIEWS'

const loadReviews = reviews => ({
    type:LOAD_REVIEWS,
    reviews
})

export const getReviews = (id) => async dispatch => {
    // console.log('what about here')
    const response = await csrfFetch(`/api/spots/${id}/reviews`)
    // console.log('what happens here', response)
    if(response.ok){
        const data = await response.json()
        dispatch(loadReviews(data.Reviews))
    }
}


//create review
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


//delete review
const DELETE_REVIEW = '/reviews/DELETE_REVIEW'

const actionDelete = reviewId => ({
    type:DELETE_REVIEW,
    reviewId
})

export const deleteReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if(response.ok){
        dispatch(actionDelete(reviewId))
    }
}


//initial state
const initialState = {}


//reducer
const reviewsReducer = (state = initialState, action) => {
    let newState = {};
    switch(action.type){
        case LOAD_REVIEWS:

            newState = {}
        action.reviews.forEach(review => {
            newState[review.id] = review
        });
        return newState;
        case ADD_REVIEW:{
            newState = {...state, [action.data.id]: action.data}
            return newState;}
        case DELETE_REVIEW:{
            newState = {...state}
            delete newState[action.reviewId]
            return newState
        }
        default:
            return state

    }
}

export default reviewsReducer;
