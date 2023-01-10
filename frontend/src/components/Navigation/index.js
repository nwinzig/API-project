import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
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
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const spotsObj = useSelector(state => state.spots)
    const spots = Object.values(spotsObj)

    const [searchFilter, setSearchFilter] = useState('')
    const [searchItems, setSearchItems] = useState([])

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    // testing search filter calling a function on change rather than use effect
    const loadItems = function(search){
        setSearchFilter(search)
        if(search.length){
            setSearchItems(spots.filter((el) => el.name.includes(searchFilter)))
        } else{
            setSearchItems([])
        }
        return
    }
    // console.log('spots im working with', spots)
    //for search
    // console.log('does this populate with items', searchItems)
    // console.log('this is search value', searchFilter)
    const handleSearch = async function(e){
        e.preventDefault()
        console.log('this is search value', searchFilter)
        setSearchFilter('')
        //direct user to a search page using the search filter results as an array passed down as prop
        return history.push({
            pathname: '/spots/search',
            state:{searchItems}
        })

    }
    //need to build search dropdown component
        // will be a filter method to create an array by comparing to products in spots

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
                    <input
                        type='search'
                        placeholder='Start your search'
                        className='searchField'
                        onChange={(e) => loadItems(e.target.value)}
                        value={searchFilter}
                    >
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
