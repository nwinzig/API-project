import React, { useEffect, useState } from 'react';
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


    //for search
    const [searchFilter, setSearchFilter] = useState('')

    const handleSearch = function(){

    }

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
            <div>
                <form className='searchForm' onSubmit={handleSearch}>
                    <input type='search' placeholder='Start your search' className='searchField'>
                    </input>
                    <button type='submit'>
                        <i className="fa-solid fa-magnifying-glass fa-xl"></i>
                    </button>
                </form>
            </div>
            <div className='signlogbuttons'>
            {isLoaded && sessionLinks}
            </div>
        </div>
    );
}

export default Navigation;
