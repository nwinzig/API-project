import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { useState } from "react"
import { updateSpot } from "../../store/spots"

const UpdateASpot = ({setShowModal}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    const {spotId} = useParams()
    let spot = useSelector(state => state.spots)
    console.log('spot to update', spot)

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const payload = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        }

        console.log('updated payload', payload)

        let updatedSpot = await dispatch(updateSpot(payload, spotId))

        if(updatedSpot){
            setShowModal(false)
            window.location.reload()
        }
    }


    return (
        <div className='formWrapper'>

            <form onSubmit={handleSubmit}>
                <label>
                    Address
                    <input
                        placeholder='Address'
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>
                <label>
                    City
                    <input
                        placeholder='City'
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </label>
                <label>
                    State
                    <input
                        placeholder='State'
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Country
                    <input
                        placeholder='Country'
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Latitude
                    <input
                        placeholder='Latitude(not required)'
                        type="text"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                    />
                </label>
                <label>
                    Longitude
                    <input
                        placeholder='Longitude(not required)'
                        type="text"
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                    />
                </label>
                <label>
                    Name
                    <input
                        placeholder='Name of the Location'
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    Description
                    <textarea
                        placeholder='Please provide a description for your location.'
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <label>
                    Price
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </label>
                <button type="submit">Update this spot</button>
            </form>
        </div>
    )
}



export default UpdateASpot;
