
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { deleteReview } from '../../store/reviews';

import './deleteReview.css'

const HandleReviewDelete = ({reviewId}) => {

    const dispatch = useDispatch();

    const handleClick = async (e) => {
        e.preventDefault()

        // console.log('review id from handle review delete', reviewId)

        dispatch(deleteReview(reviewId))
        window.location.reload()

    }


    return(
        <>
            <div className='deleteButton' onClick={handleClick}>
                Delete
            </div>
        </>
    )
}

export default HandleReviewDelete;
