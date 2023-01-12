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
import { csrfFetch } from '../../store/csrf';


function Navigation({ isLoaded }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const [dropDown, setDropDown] = useState(false)
    const [searchFilter, setSearchFilter] = useState('')
    const [searchItems, setSearchItems] = useState([])
    const [searchSpots, setSearchSpots] = useState([])


    useEffect(() => {
        async function fetchSpots(){
            const request = await csrfFetch('/api/spots')
            const newRequest = await request.json()
            setSearchSpots(newRequest.Spots)
        }
        fetchSpots()
    }, [dispatch])

    const loadItems = function(search){
        setSearchFilter(search)
        if(search.length){
            setDropDown(true)
            setSearchItems(searchSpots.filter((el) => el?.name.includes(search)))
        } else{
            setSearchItems([])
        }
        return
    }

    const dropdownResults = [];
        if(searchItems?.length){
            let i=0;
            while(i<searchItems.length && i<5){
                dropdownResults.push(searchItems[i])
                i++
            }
        }

    const handleSearch = async function(e){
        e.preventDefault()
        setSearchFilter('')
        setDropDown(false)
        return history.push({
            pathname: '/spots/search',
            state:{searchItems}
        })
    }

    // conditionally rendered components //

    let dropdownComp;
    if(dropdownResults?.length){
        dropdownComp =(
            <div className='dropDownSearch'>
                {dropdownResults?.map(spot => (
                    <NavLink
                    to={`/spots/${spot?.id}`}
                    key={spot?.id}
                    className='dropItem'
                    onClick={() =>{
                        setDropDown(false)
                        setSearchFilter('')
                    }}
                    >
                    <i className="fa-solid fa-magnifying-glass fa-l" id='addMarginRight'></i>
                    {spot?.name}
                    </NavLink>
                ))}
            </div>
        )
    }

    let resultsComp;
    if(searchItems?.length){
        resultsComp = (
            <div className='searchDropDown'>

            </div>
        )
    }

    //adding event to close dropdown if user clicks away
    let root = document.getElementById('root')
    if(dropDown){
        root.addEventListener('click', () => {setDropDown(false)})
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
        <>
            <div className='homeBar' id='bar'>
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
                <div className='searchAndDrop'>
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
                    {dropDown && dropdownComp}
                <div className='signlogbuttons'>
                {isLoaded && sessionLinks}
                </div>
            </div>
            {/* {dropdownComp} */}
        </>
    );
}

export default Navigation;
