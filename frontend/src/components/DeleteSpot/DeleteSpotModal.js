import { useState } from "react"
import { Modal } from "../../context/Modal"
import DeleteASpot from "."
import './deleteSpot.css'

function DeleteSpotModal () {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button className='redWarning' onClick={() => setShowModal(true)}>Delete your spot</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteASpot setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )

}


export default DeleteSpotModal;
