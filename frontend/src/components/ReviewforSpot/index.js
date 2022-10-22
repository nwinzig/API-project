import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useParams } from 'react-router-dom';
import { Modal } from '../../context/Modal';

import { getReviews } from '../../store/reviews';
import CreateReviewModal from '../CreateReview/CreateReviewModal';
import HandleReviewDelete from '../DeleteReview';

import './reviewForSpot.css'

const ReviewComponent = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams()

    const sessionUser = useSelector(state => state.session.user)
    let spot = useSelector(state => state.spots)

    const reviewsList = useSelector(state => state.reviews)
    const reviewsListArr = Object.values(reviewsList)

    useEffect(() => {
        dispatch(getReviews(spotId))
    }, [dispatch])

    let reviewArray = [];

    if (reviewsListArr.length >= 1) {
        reviewsListArr.forEach(review => {
            reviewArray.push(review)
        })
    }

    console.log('array', reviewArray)

    let createReviewLink;
    if (sessionUser && sessionUser?.id !== spot?.ownerId) {
        createReviewLink = (
            <CreateReviewModal />
        )
    } else if(sessionUser && sessionUser?.id === spot?.ownerId){
        createReviewLink = (
            <>
            <div className='red'>
                You cannot review your own spot.
            </div>
            </>
        )
    }
    else {
        createReviewLink = (
            <>
            <div>
                Login above to leave a review.
            </div>
            </>
        )
    }


    return (
        <>
            <div className='reviewTitle'>
                <h2>Reviews</h2>
                <div>
                {createReviewLink}
                </div>
            </div>
            <div className='reviewWrapper'>
                {reviewArray?.map(review => (
                    <div>
                        <div className='reviewTitleWrapper'>
                        <h3>
                            {review?.User?.firstName}
                        </h3>
                        <div className='deleteWrapper'>
                        {sessionUser?.id === review?.userId && (<HandleReviewDelete reviewId={review.id}/>)}
                        </div>
                        </div>
                        <p>
                            {review?.review}
                        </p>
                    </div>
                ))}
            </div>
        </>
    )
}


export default ReviewComponent
