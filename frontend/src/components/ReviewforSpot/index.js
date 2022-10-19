import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {Link, useParams } from 'react-router-dom';

import { getReviews } from '../../store/reviews';

import './reviewForSpot.css'

const ReviewComponent = () => {
    const dispatch = useDispatch()
    const {spotId} = useParams()

    const reviewsList = useSelector(state => state.reviews)

    console.log('all reviews for the spot', reviewsList)
    const reviewsListArr = Object.values(reviewsList)
    console.log('reviews in an array',reviewsListArr)
    useEffect(() => {
        dispatch(getReviews(spotId))
    }, [dispatch])


    return (
        <>
        <div className='reviewTitle'>
        <h2>Reviews</h2>
        </div>
        <div className='reviewWrapper'>
            {reviewsListArr.map(review => (
                <div>
                    <h3>
                        user name
                    </h3>
                    <p>
                        {review.review}
                    </p>
                </div>
            ))}
        </div>
        </>
    )
}


export default ReviewComponent
