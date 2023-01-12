import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { getSpots } from "../../store/spots"
import './search.css'

const SearchResults = () => {
    const dispatch = useDispatch()

    const location = useLocation()
    const [spots, setSpots] = useState([])
    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    useEffect(() => {
        setSpots(location.state.searchItems)
    },[location])

    //creating conditional component to render a different page if there are no results
    let searchResultsComp;
    if (spots?.length) {
        searchResultsComp = (
            <div className='searchCardContainer'>
                {spots?.map(spot => (
                    <Link to={`/spots/${spot?.id}`} className='searchCard' key={spot?.id}
                    onClick={() => window.scrollTo(0,0)}
                    >
                        <div className='searchCardImage'>
                            <img src={spot?.previewImage} alt='Spot preview'></img>
                        </div>
                        <div className='searchCardInfo'>
                            <div className="cardTitle">
                                <div>
                                    {spot?.name}
                                </div>
                                <div>
                                    <i className="fa-solid fa-star"></i>  {spot?.avgRating}
                                </div>
                            </div>
                            <div id="addCardLeftMargin">
                                {spot?.city}, {spot?.state}
                            </div>
                            <div id="addCardLeftMargin">
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
                <img src="https://res.cloudinary.com/dydhvazpw/image/upload/v1673538707/360_F_387370928_uxePPpjy9FtcCCU3oTjHbPsKjl36mOaX_l17wlf.jpg"></img>
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
