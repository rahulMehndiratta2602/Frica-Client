import axios from 'axios'
import { toast } from "react-toastify"

export const handleSubCatClick = (catId, subCatId, dispatch, navigate, filter) => {
    dispatch({
        type: "UPDATE_FILTER",
        payload: { ...filter, category: catId, chosenSubCategories: [subCatId] }
    })
    navigate('/shop', { state: { from: "singleProduct" } })
}
export const handleCatClick = (catId, dispatch, navigate, filter) => {
    dispatch({
        type: "UPDATE_FILTER",
        payload: { ...filter, category: catId }
    })
    navigate('/shop')
}
export const addToWishlist = async (productId, user) => {
    if (user && user.token)
        await axios({
            method: "POST",
            url: `${process.env.REACT_APP_API}/users/wishlist/${productId}`,
            headers: { authToken: user.token }
        }).then(res => toast.success("Added to wishlist"))
}
export const removeFromWishlist = async (productId, user) => {
    if (user && user.token)
        await axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_API}/users/wishlist/${productId}`,
            headers: { authToken: user.token }
        }).then(res => toast.success("Removed from wishlist"))
}
export const handleRatingButtonClick = (user, setShowModal, navigate, params) => {
    if (user && user.token) {
        setShowModal(true)
        document.querySelector('body').classList.add('modal-open')

    }
    else {
        navigate(
            '/login',
            {
                state: { from: `/product/${params.slug}` }
            }
        )
    }
}
export const handleRatingSubmit = async (product, rating, review, method, setReviewSubmitted, token) => {
    try {
        await axios({
            method,
            url: `${process.env.REACT_APP_API}/reviews/product/${product._id}`,
            data: { rating, review },
            headers: {
                authToken: token
            }
        })
        method === 'DELETE' ? toast.success('Review Removed') : toast.success('Thanks for feedback!')
        setReviewSubmitted(true)
        window.location.reload()
    }
    catch (err) {
        console.log(err.response)
    }
}
export const getRelated = async (productId) => {
    return await axios.post(`${process.env.REACT_APP_API}/products/listRelated/${productId}`)

}
export const getReview = async (productId, setReview, token) => {

    const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API}/reviews/product/${productId}`,
        headers: {
            'authToken': token
        }
    })
    setReview(res.data.review)
}
// export const


