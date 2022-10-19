import { csrfFetch } from "./csrf"

const LOAD_REVIEWS = '/api/LOAD_REVIEWS'

const loadReviews = reviews => ({
    type:LOAD_REVIEWS,
    reviews
})

export const getReviews = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`)

    if(response.ok){
        const reviews = await response.json()
        dispatch(loadReviews(reviews))
    }
}


//initial state
const initialState = {}


//reducer
const reviewsReducer = (state = initialState, action) => {
    let newState = {};
    switch(action.type){
        case LOAD_REVIEWS:
        action.reviews.Reviews.forEach(review => {
            newState[review.id] = review
        });
        return newState;
        default:
            return state

    }
}

export default reviewsReducer;
