import { useEffect, useState } from "react"
import StarRatings from 'react-star-ratings'
import { MdClose } from 'react-icons/md'
import { handleRatingSubmit } from "../functions/singleProductDisplay"
import { useSelector } from "react-redux"

const RatingModal = ({ setShowModal, review, setReviewSubmitted, product }) => {
    const [rating, setRating] = useState(1)
    const [reviewText, setReviewText] = useState('')
    const [characters, setCharacters] = useState(0)
    const [scroll, setScroll] = useState(window.scrollY)
    const { user } = useSelector(state => ({ ...state }))

    useEffect(() => {
        if (review) {
            setRating(review.rating)
            setReviewText(review.review)
            setCharacters(review.review.length)
        }
    }, [review])
    useEffect(() => {
        const widthEvent = window.addEventListener('resize', () => {
            setScroll(window.scrollY)
        })
        return () => window.removeEventListener('resize', widthEvent)
    }, [])
    const closeModal = () => {
        setShowModal(false)
        document.querySelector('body').classList.remove('modal-open')
    }

    return (
        <div className={`z-50 absolute left-0 w-[100vw] overflow-hidden h-screen bg-slate-900 bg-opacity-80 flex justify-center items-center`
        }
            style={{ top: `${scroll}px` }}>
            <div className="absolute top-4 right-4 font-bold text-3xl cursor-pointer text-white " onClick={closeModal}><MdClose /> </div>
            <div className="bg-white py-10 md:w-[45vw] sm:w-[60vw] xxs:w-[80vw] relative items-center space-y-2 w-60 flex flex-col rounded-md">
                <label className='font-montserrat'>Leave Rating</label>
                <StarRatings
                    rating={rating}
                    starRatedColor="#31a34e"
                    starHoverColor="#31a34e"
                    changeRating={(val) => setRating(val > 0 ? val : 1)}
                    numberOfStars={5}
                    name='rating'
                    isSelectable='false'
                    starSpacing="1px"
                    starDimension='24px'
                />
                <div className="relative w-full px-4 pt-4">

                    <textarea
                        spellCheck='false'
                        type="text"
                        name="review"
                        id="review"
                        className="bg-slate-100 px-2 scrollhost overflow-y-scroll w-full h-[300px] md:h-[200px] xxs:h-[250px]
                        focus:ring-0 focus:border-slate-300 focus:outline-slate-300
                         relative resize-none "
                        placeholder="Enter Review"
                        maxLength="2000"
                        value={reviewText}
                        onChange={(e) => {
                            setReviewText(e.target.value)
                            setCharacters(e.target.value.length)
                        }}
                    />
                    <span
                        className="absolute right-5 bottom-1 md:bottom-2 bg-red-200
                            text-gray-600 rounded-sm px-1 text-xs "
                    >
                        {characters}/2000
                        </span>
                </div>
                {review !== null && <button className=' py-1 px-4 bg-red-500 text-white rounded-sm !mt-4 hover:opacity-60' onClick={() => {
                    // product, rating, review, method, setReviewSubmitted
                    handleRatingSubmit(product, undefined, undefined, 'DELETE', setReviewSubmitted, user.token)
                    closeModal()
                }}>Delete Review</button>}
                <button className=' py-1 px-4 bg-primary text-white rounded-sm !mt-4 hover:opacity-60' onClick={() => {
                    review !== null ? handleRatingSubmit(product, rating, reviewText, 'PATCH', setReviewSubmitted, user.token) : handleRatingSubmit(product, rating, reviewText, 'POST', setReviewSubmitted, user.token)
                    closeModal()
                }}>{review !== null ? 'Update' : 'Submit'}</button>
                <button className=' py-1 px-2 rounded-sm bg-pink-200 hover:opacity-60' onClick={closeModal}>Cancel</button>

            </div>

        </div>
    )
}

export default RatingModal
