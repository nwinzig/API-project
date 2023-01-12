import { useState } from "react"
import { Modal } from "../../context/Modal"
import DeleteASpot from "."
import './deleteSpot.css'

function DeleteSpotModal () {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="deleteHolder">
            <button className='redWarning' onClick={() => setShowModal(true)}>Delete spot</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteASpot setShowModal={setShowModal} />
                </Modal>
            )}
        </div>
    )

}


export default DeleteSpotModal;
