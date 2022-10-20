import React, {useState} from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';
import './signupModal.css'

function SignupModal(){
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button onClick={() => setShowModal(true)}>Sign up</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupForm/>
                </Modal>
            )}
        </>
    )
}

export default SignupModal;
