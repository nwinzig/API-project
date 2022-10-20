import React, {useState} from 'react';
import { Modal } from '../../context/Modal';
import HostASpot from '../CreateSpot';
import { Link } from 'react-router-dom';

function HostModal () {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <Link to={'/spots/create'}>
                Host a Spot
            </Link>
        </>
    )
}

export default HostModal;
