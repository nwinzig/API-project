
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

    useEffect(() => {
        dispatch(getSpot(spotId))
    },[spotId, dispatch])

    const ownerObj = {...spot.Owner}
    console.log('the spot', spot)

    let imagesArr = [];
    // console.log('images arr', typeof imagesArr)
    // console.log("what do i get for spotImages", spot.SpotImages)
    // console.log(typeof spot.SpotImages === 'object')
    if(spot.SpotImages && typeof spot.SpotImages === 'object'){
        spot.SpotImages.forEach(image => {
            imagesArr.push(image.url)
        });
    }
    console.log('this should be an images array', imagesArr)

    let firstInnerImage;
    if(imagesArr[1]){
        firstInnerImage = (
            <img src={imagesArr[1]} alt='spot picture'></img>
        )
    } else {
        firstInnerImage = (
            <div className='noImage'> No Image</div>
        )
    }

    let secondInnerImage;
    if(imagesArr[2]){
        secondInnerImage = (
            <img src={imagesArr[2]} alt='spot picture'></img>
        )
    } else {
        secondInnerImage = (
            <div className='noImage'> No Image</div>
        )
    }

    let thirdInnerImage;
    if(imagesArr[3]){
        thirdInnerImage = (
            <img src={imagesArr[3]} alt='spot picture'></img>
        )
    } else {
        thirdInnerImage = (
            <div className='noImage'> No Image</div>
        )
    }

    let fourthInnerImage;
    if(imagesArr[4]){
        fourthInnerImage = (
            <img src={imagesArr[4]} alt='spot picture'></img>
        )
    } else {
        fourthInnerImage = (
            <div className='noImage'> No Image</div>
        )
    }

    let previewImage = []
    if(spot.SpotImages && typeof spot.SpotImages === 'object'){
        spot.SpotImages.forEach(image => {
            if(image.preview === true){
                previewImage.push(image.url)
            }
        });
    }
    previewImage = previewImage[0]



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
                <div className='previewImageBlock'>
                    <img src={previewImage} alt='preview'></img>
                </div>
                <div className='imageBlock'>
                    <div className='firstinnerImage'>
                        {firstInnerImage}
                    </div>
                    <div className='secondinnerImage'>
                        {secondInnerImage}
                    </div>
                    <div className='thirdinnerImage'>
                        {thirdInnerImage}
                    </div>
                    <div className='fourthinnerImage'>
                        {fourthInnerImage}
                    </div>
                </div>
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
