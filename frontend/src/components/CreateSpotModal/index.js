import React, {useState} from 'react';
import { Modal } from '../../context/Modal';
import HostASpot from '../CreateSpot';

function HostModal () {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
        <button onClick={() => setShowModal(true)}>Start Hosting</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <HostASpot/>
            </Modal>
        )}
    </>
    )
}

export default HostModal;
