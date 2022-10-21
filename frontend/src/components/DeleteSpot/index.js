
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { useState } from "react"
import { deleteSpot } from "../../store/spots"


const DeleteASpot = ({setShowModal}) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const {spotId} = useParams()
    console.log('spotId from delete', spotId)

    // let spot = useSelector(state => state.spots)
    // console.log("spot from delete", spot)

    const handleDelete = async (e) => {
        e.preventDefault()
        console.log('before')
        dispatch(deleteSpot(spotId))
        console.log('what do i get from deletedSpot')

        if(deleteSpot){
            console.log('do we get here')
            history.push('/')
        }

    }

    return (
        <div className="deleteWrapper">
            <h2 className="deleteWarning">
                Warning: Delete Cannot Be Undone
            </h2>
            <button onClick={handleDelete}>DELETE</button>
        </div>
    )
}

export default DeleteASpot
