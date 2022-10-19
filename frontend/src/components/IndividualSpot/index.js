
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
    },[spotId, dispatch])

    const ownerObj = {...spot.Owner}
    console.log('the spot', spot)
    // const spotImages = {...spot.SpotImages}
    // console.log("should be object holding objects",spotImages)
    // let spotImagesArr = Object.values(spotImages)
    // let manipulateArr = [...spotImagesArr]

    // console.log("manipulating spot image data", spotImagesArr)
    // console.log('do you have a length', spotImagesArr.length)
    // console.log('manipulate', manipulateArr[0])
    // let firstObj = manipulateArr[0]
    // console.log('first Object', firstObj)
    // let manipulateObj = function (firstObj){

    // }


    // console.log('should be single object', spotImages[0])
    // let firstImage = spotImages[0].url
    // console.log('hoping to just have the url of first object',firstImage)
    // console.log(spotImages[0])
    // let spotImagesArr = spotImages.map(image => {
    //     spotImagesArr.push(image)
    // });

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
                <Link to={'/'}>
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
