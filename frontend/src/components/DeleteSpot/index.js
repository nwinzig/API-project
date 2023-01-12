
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { useState } from "react"
import { deleteSpot } from "../../store/spots"
import './deleteSpot.css'

const DeleteASpot = ({setShowModal}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const {spotId} = useParams()

    const handleDelete = async (e) => {
        e.preventDefault()
        dispatch(deleteSpot(spotId))
        if(deleteSpot){
            history.push('/')
        }
    }

    return (
        <div className="deleteButtonWrapper">
            <h2 className="deleteWarning">
                Warning: Delete Cannot Be Undone
            </h2>
            <button onClick={handleDelete} className='finalDelete'>Delete</button>
            <button onClick={() => setShowModal(false)} className='cancelDelete'>Cancel</button>
        </div>
    )
}

export default DeleteASpot
