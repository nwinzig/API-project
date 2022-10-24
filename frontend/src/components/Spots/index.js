
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {Link } from 'react-router-dom';

import { getSpots } from '../../store/spots';

import './spots.css'
const SpotCards = () => {
    const dispatch = useDispatch()

    const spotsObj = useSelector(state => state.spots)

    const spots = Object.values(spotsObj)
    // console.log(spots)
    // console.log('spots', spots)

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])


    return (
        <div className='cardHolder'>
            {spots.map(spot => (
                <Link to={`/spots/${spot?.id}`} className='card' key={spot?.id}>
                    <div className='cardImage'>
                        <img src={spot?.previewImage} alt='Spot preview'></img>
                    </div>
                    <div className='cardInfo'>
                        <div className='location-rating'>
                            <div>
                                {spot?.city}, {spot?.state}
                            </div>
                            <div>
                                <i className="fa-solid fa-star"></i>  {spot?.avgRating}
                            </div>
                        </div>
                        <div>
                            <span className='cardPrice'>${spot?.price}</span> night
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default SpotCards
