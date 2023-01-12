import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { createSpot } from '../../store/spots';
import './CreateaSpot.css'

const HostASpot = ({ data }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    if (!sessionUser) {
        history.push('/')
    }
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [url, setUrl] = useState('')
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
        console.log('payload', payload)
        const image = {
            url,
            preview:true
        }
        console.log('image', image)
        let createdSpot = await dispatch(createSpot(payload, image)).catch(
            async(res) => {
                const data = await res.json();
                if (data) setErrors([data.errors]);
            }
        )
        if (createdSpot) {
            history.push(`/`)
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
            <div className='title'>
                Please Fill out to start Hosting
            </div>
            <form onSubmit={handleSubmit} className='createSpotForm'>
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
                        placeholder='Name of the Location'
                        type="text"
                        value={name}
                        maxLength='50'
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Image URL
                    <input
                        placeholder='https://example.com'
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Description
                    <textarea
                        placeholder='Please provide a brief description.'
                        type="text"
                        value={description}
                        maxLength='125'
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Price
                    <input
                        type="number"
                        value={price}
                        min='0'
                        step="0.01"
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </label>
                <button className='hostButton' type="submit">Host this spot</button>
            </form>
        </div>
    )

}


export default HostASpot
