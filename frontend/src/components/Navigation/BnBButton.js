import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LoginFormModal from "../LoginFormModal";
// import SignupModal from "../SignupFormModal";
import './myButton.css'
import { Modal } from '../../context/Modal';
import SignupForm from "../SignupFormModal/SignupForm";

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

function MyButton () {

    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(false)

    const openMenu = () => {
        if(showMenu) return;
        setShowMenu(true)
    };

    useEffect(() => {
        if(!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false)
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu)
    }, [showMenu])


    return (
        <div className="dropDown">
            <button onClick={openMenu} className='homeButton'>
            <i className="fa-solid fa-caret-down fa-xl"></i>
            <i className="fa-regular fa-circle-user fa-xl"></i>
            </button>
            {showMenu && (
                <ul className="homepagePullDown">
                    <div className="logInButton">
                        <button >Log In</button>
                    </div>
                    <div className="signUpButton">
                        <button onClick={SignupModal()}>Sign up</button>
                    </div>
                </ul>
            )}
        </div>
    )
}


export default MyButton
