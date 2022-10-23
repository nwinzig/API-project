import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UpdateASpot from './index';
import './update.css'
function UpdateSpotModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="updateButtonWrapper">
            <div className='updateButton' onClick={() => setShowModal(true)}>Update Spot</div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UpdateASpot setShowModal={setShowModal}/>
                </Modal>
            )}
        </div>
    );
}

export default UpdateSpotModal
