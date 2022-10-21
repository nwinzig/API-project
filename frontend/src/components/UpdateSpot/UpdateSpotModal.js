import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UpdateASpot from './index';

function UpdateSpotModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Update your spot</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UpdateASpot setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    );
}

export default UpdateSpotModal
