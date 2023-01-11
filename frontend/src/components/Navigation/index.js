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
        console.log('what is search', search)
        setSearchFilter(search)
        if(search.length){
            setSearchItems(spots.filter((el) => el.name.includes(search)))
        } else{
            setSearchItems([])
        }
        return
        // console.log('does search filter change', searchFilter)
        // setSearchItems(spots.filter((el) => el.name.includes(search)))

    }
    console.log('what are search items', searchItems)
    const handleSearch = async function(e){
        e.preventDefault()
        console.log('this is search value', searchFilter)
        setSearchFilter('')

        return history.push({
            pathname: '/spots/search',
            state:{searchItems}
        })

    }
    //need to build search dropdown component
        // will be a filter method to create an array by comparing to products in spots
    // const dropdownResults = [];
    // const setdropDown = function(){
    //     if(searchItems?.length){
    //         let i=0;
    //         while(i<searchItems.length && i<5){
    //             dropdownResults.push(searchItems[i])
    //             i++
    //         }
    //     }
    // }
    // console.log('this will be my dropdown items', dropdownResults)
    let resultsComp;
    if(searchItems?.length){
        resultsComp = (
            <div className='searchDropDown'>

            </div>
        )
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
