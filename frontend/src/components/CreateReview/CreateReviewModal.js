import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateReviewForm from './index';

function CreateReviewModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Leave a Review</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateReviewForm />
                </Modal>
            )}
        </>
    );
}

export default CreateReviewModal;
