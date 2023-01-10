import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import  SignupModal from '../SignupFormModal';
import MyButton from './BnBButton';
import HostModal from '../CreateSpotModal';
import DemoLoginButton from '../LoginFormPage/DemoLogin';
import { getSpots } from '../../store/spots';


function Navigation({ isLoaded }) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const spotsObj = useSelector(state => state.spots)
    const spots = Object.values(spotsObj)

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])


    //changing links in nav depending if the user is logged in
    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className='loggedInNav'>
                <HostModal />
                <ProfileButton user={sessionUser} />
            </div>
        );
    } else {
        sessionLinks = (
            <div className='standardNav'>
                <div className='demoButtonWrapper'>
                    <DemoLoginButton />
                </div>
                <div className='loginModalWrapper'>
                <LoginFormModal />
                </div>
                <SignupModal />
            </div>
        );
    }

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
