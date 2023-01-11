
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import UpdateSpotModal from '../UpdateSpot/UpdateSpotModal';
import { getSpot } from '../../store/spots';
import './individualSpot.css'


const SpotDetails = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const sessionUser = useSelector(state => state.session.user)
    let spot = useSelector(state => state.spots)

    useEffect(() => {
        dispatch(getSpot(spotId))
    }, [spotId, dispatch])

    const ownerObj = { ...spot.Owner }
    // console.log('the spot', spot)
    // console.log('owner', ownerObj)

    let createUpdateLink;
    if (sessionUser && sessionUser.id === spot.ownerId) {
        createUpdateLink = (
            <UpdateSpotModal />
        )
    }


    let imagesArr = [];

    if (spot.SpotImages && typeof spot.SpotImages === 'object') {
        spot.SpotImages.forEach(image => {
            imagesArr.push(image.url)
        });
    }


    let firstInnerImage;
    if (imagesArr[1]) {
        firstInnerImage = (
            <img src={imagesArr[1]} alt='spot picture' id='first'></img>
        )
    } else {
        firstInnerImage = (
            <img src='https://res.cloudinary.com/dydhvazpw/image/upload/v1666272842/istockphoto-1357365823-612x612_p6siif.jpg' alt='spot picture' id='first'></img>
        )
    }

    let secondInnerImage;
    if (imagesArr[2]) {
        secondInnerImage = (
            <img src={imagesArr[2]} alt='spot picture' id='second'></img>
        )
    } else {
        secondInnerImage = (
            <img src='https://res.cloudinary.com/dydhvazpw/image/upload/v1666272842/istockphoto-1357365823-612x612_p6siif.jpg' alt='spot picture' id='second'></img>
        )
    }

    let thirdInnerImage;
    if (imagesArr[3]) {
        thirdInnerImage = (
            <img src={imagesArr[3]} alt='spot picture' id='third'></img>
        )
    } else {
        thirdInnerImage = (
            <img src='https://res.cloudinary.com/dydhvazpw/image/upload/v1666272842/istockphoto-1357365823-612x612_p6siif.jpg' alt='spot picture' id='third'></img>
        )
    }

    let fourthInnerImage;
    if (imagesArr[4]) {
        fourthInnerImage = (
            <img src={imagesArr[4]} alt='spot picture' id='fourth'></img>
        )
    } else {
        fourthInnerImage = (
            <img id='fourth' src='https://res.cloudinary.com/dydhvazpw/image/upload/v1666272842/istockphoto-1357365823-612x612_p6siif.jpg' alt='spot picture'></img>
        )
    }

    let previewImage = []
    if (spot.SpotImages && typeof spot.SpotImages === 'object') {
        spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                previewImage.push(image.url)
            }
        });
    } else {
        previewImage.push('https://res.cloudinary.com/dydhvazpw/image/upload/v1666272842/istockphoto-1357365823-612x612_p6siif.jpg')
    }
    previewImage = previewImage[0]



    return (
        <div className='spotWrapper'>
            <div className='titleWrapper'>
                <div className='handleUpdate'>
                    <h1 className='spotTitle'>{spot.name}</h1>
                    <div className='updateButton'>
                        {createUpdateLink}
                    </div>
                </div>
                <div className='spotHeaderDetails'>
                    <i className="fa-solid fa-star"></i>{`${spot.avgStarReviews}`}
                    <div>
                        {`${spot.numReviews} reviews`}
                    </div>
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
                    <div className='imgContainer'>
                        <div className='firstImage'>
                        {firstInnerImage}
                        </div>
                    </div>
                    <div className='imgContainer'>
                        <div className='secondImage'>
                        {secondInnerImage}
                        </div>
                    </div>
                    <div className='imgContainer'>
                        {thirdInnerImage}
                    </div>
                    <div className='imgContainer'>
                        {/* <div className='fourthImage'>
                        {fourthInnerImage}
                        </div> */}
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
