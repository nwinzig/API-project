
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { getSpot } from '../../store/spots';
import './individualSpot.css'


const SpotDetails = () => {
    const dispatch = useDispatch();
    const {spotId} = useParams();


    let spot = useSelector(state => state.spots)

    // console.log('owner', spot.Owner)
    useEffect(() => {
        dispatch(getSpot(spotId))
    },[dispatch])

    const ownerObj = {...spot.Owner}
    console.log('the spot', spot)
    // console.log('name', spot.name)
    // console.log(ownerObj.firstName)
    return (
        <div className='spotWrapper'>
            <div className='titleWrapper'>
                <div>
                    <h1 className='spotTitle'>{spot.name}</h1>
                </div>
                <div className='spotHeaderDetails'>
                <i className="fa-solid fa-star"></i>{`${spot.avgStarReviews}`}
                <Link>
                    {`${spot.numReviews} reviews`}
                </Link>
                <div>
                    {`${spot.city}, ${spot.state}, ${spot.country}`}
                </div>
                </div>
            </div>
            <div className='imageWrapper'>
                image placeholder
            </div>
            <div className='bodyWrapper'>
                <h2 className='spotTitle'>{`${spot.name} hosted by ${ownerObj.firstName}`}</h2>
                <p>{`$${spot.price} night`}</p>
                <p>{spot.description}</p>
            </div>
        </div>
    )
}

export default SpotDetails
