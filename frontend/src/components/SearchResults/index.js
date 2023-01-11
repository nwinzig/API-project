import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { useLocation } from "react-router-dom"
import './search.css'

const SearchResults = () => {
    const location = useLocation()
    const [spots, setSpots] = useState([])

    useEffect(() => {
        console.log('trying to access a prop moved by history push', location.state)
        setSpots(location.state.searchItems)
    },[location])
    console.log('what is spots if none are found', spots)

    //creating conditional component to render a different page if there are no results
    let searchResultsComp;
    if (spots?.length) {
        searchResultsComp = (
            <div className='cardHolder'>
                {spots?.map(spot => (
                    <Link to={`/spots/${spot?.id}`} className='card' key={spot?.id}>
                        <div className='cardImage'>
                            <img src={spot?.previewImage} alt='Spot preview'></img>
                        </div>
                        <div className='cardInfo'>
                            <div className='location-rating'>
                                {/* <div>
                                {spot?.name}
                            </div> */}
                                <div>
                                    {spot?.city}, {spot?.state}
                                </div>
                                <div>
                                    <i className="fa-solid fa-star"></i>  {spot?.avgRating}
                                </div>
                            </div>
                            <div>
                                <span className='cardPrice'>${spot?.price}</span> night
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        )
    } else {
        searchResultsComp =(
            <div className="noSearchResults">
                <h3>
                    We can't find any spots with a similar name. Please try again.
                </h3>
                <NavLink
                to={'/'}
                className='backHome'
                >
                    Back Home
                </NavLink>
            </div>
        )
    }
    return (
        <>
            {searchResultsComp}
        </>
    )
}

export default SearchResults
