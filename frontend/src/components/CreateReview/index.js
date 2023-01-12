
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReview , getReviews} from "../../store/reviews";
import './createReview.css'

function CreateReviewForm({setShowModal}) {

    const history = useHistory()
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const sessionUser = useSelector(state => state.session.user)

    const [review, setReview] = useState('')
    const [stars, setStars] = useState('')
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const payload = {
            review,
            stars
        }

        let createdReview = await dispatch(createReview(payload, spotId)).catch(
            async(res) => {
                const data = await res.json();
                if (data) setErrors([data.errors]);
            }
        )

        if (createdReview) {
            setReview('')
            setStars('')
            await dispatch(getReviews(spotId))
            setShowModal(false)
            window.location.reload()
        }
    }

    let errorMessage;
    if (errors.length >= 1) {
        errorMessage = (
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
        )
    }

    return (
        <form onSubmit={handleSubmit} className='createReviewForm'>
            <h2>
                Leave a Review
            </h2>
            {errors && <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>}
            <label>
                How would you rate your stay?
                <select onChange={(e) => setStars(e.target.value)}>
                    <option value="">
                        Please select an option
                    </option>
                    <option value='5'>
                        5
                    </option>
                    <option value='4'>
                        4
                    </option>
                    <option value='3'>
                        3
                    </option>
                    <option value='2'>
                        2
                    </option>
                    <option value='1'>
                        1
                    </option>
                </select>
            </label>
            <label>
                Review
                <textarea
                    placeholder="Tell us about your stay!"
                    type="text"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                >
                </textarea>
            </label>
            <button type="submit" className="leaveReviewButton">Create Review</button>
        </form>
    )
}

export default CreateReviewForm
