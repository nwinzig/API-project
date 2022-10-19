import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import  SignupModal from '../SignupFormModal';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <LoginFormModal />
                <SignupModal />
            </>
        );
    }

    // return (
    //     <ul>
    //         <li>
    //             <NavLink exact to="/">Home</NavLink>
    //             {isLoaded && sessionLinks}
    //         </li>
    //     </ul>
    // );
    return (
        <div className='homeBar'>
            <div className='homeLogo'>
                <NavLink exact to="/">
                    <div>
                        <i className="fa-brands fa-airbnb"></i>
                    </div>
                    <div className='logoTitle'>
                        BnB
                    </div>
                </NavLink>
            </div>
            <div className='signlogbuttons'>
            {isLoaded && sessionLinks}
            </div>
        </div>
    );
}

export default Navigation;
