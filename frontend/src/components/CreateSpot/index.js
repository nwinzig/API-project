

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {Link, useHistory } from 'react-router-dom';

import { createSpot } from '../../store/spots';

const HostASpot = ({data}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    if(!sessionUser){
        history.push('/')
    }
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

    // const updateAddress = (e) => setAddress(e.target.value)
    // const updateCity = (e) => setCity(e.target.value)
    // const updateState = (e) => setState(e.target.value)
    // const updateCountry = (e) => setCountry(e.target.value)
    // const updateLat = (e) => setLat(e.target.value)
    // const updateLng = (e) => setLng(e.target.value)
    // const updateName = (e) => setName(e.target.value)
    // const updateDescription = (e) => setDescription(e.target.value)
    // const updatePrice = (e) => setPrice(e.target.value)

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
        console.log("should be collected info", payload)
        let createdSpot = await dispatch(createSpot(payload))
        if(createdSpot){

            history.push(`/`)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                address
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
            </label>
            <label>
                City
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
            </label>
            <label>
                State
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                />
            </label>
            <label>
                Country
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                />
            </label>
            <label>
                Latitude
                <input
                    type="text"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                />
            </label>
            <label>
                Longitude
                <input
                    type="text"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                />
            </label>
            <label>
                Name
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>
                Description
                <input
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
            <button type="submit">Host this spot</button>
        </form>
    )

}


export default HostASpot
