import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { useState } from "react"
import { updateSpot } from "../../store/spots"
import DeleteSpotModal from "../DeleteSpot/DeleteSpotModal"
import './update.css'

const UpdateASpot = ({setShowModal}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    const {spotId} = useParams()
    let spot = useSelector(state => state.spots)
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
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
            name,
            description,
            price
        }
        let updatedSpot = await dispatch(updateSpot(payload, spotId)).catch(
            async(res) => {
                const data = await res.json();
                if (data) setErrors([data.errors]);
            }
        )
        if(updatedSpot){
            setShowModal(false)
            window.location.reload()
        }
    }

    let errorMessage;
    if (errors.length >= 1) {
        errorMessage = (
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
        )
    }

    return (
        <div className='formWrapper'>
            <form onSubmit={handleSubmit} className='updateSpotForm'>
                {errorMessage}
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
                    Name
                    <input
                        required
                        placeholder='Name of the Location'
                        type="text"
                        value={name}
                        maxLength='50'
                        onChange={(e) => setName(e.target.value)}
                    />

                </label>
                <label>
                    Description
                    <textarea
                        required
                        placeholder='Please provide a description for your location.'
                        type="text"
                        maxLength='125'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <label>
                    Price
                    <input
                        required
                        type="number"
                        value={price}
                        min='0'
                        step="0.01"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </label>
                <div className="updateButtonContainer">
                    <button className="updateSubmit" type="submit">Update spot</button>
                    <div className="updateDelete">
                        <DeleteSpotModal />
                    </div>
                </div>
            </form>

        </div>
    )
}



export default UpdateASpot;
