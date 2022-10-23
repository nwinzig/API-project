import React, {useState} from 'react';
import { Modal } from '../../context/Modal';
import HostASpot from '../CreateSpot';
import { Link } from 'react-router-dom';
import './HostModal.css'
function HostModal () {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className='hostModal'>
            <Link to={'/spots/create'}>
                Host a Spot
            </Link>
        </div>
    )
}

export default HostModal;
