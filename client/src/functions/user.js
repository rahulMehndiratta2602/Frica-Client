//CRUD on User Cart,User Address etc.
import axios from 'axios'

export const userCart = async (cart, authToken) => {
    return await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API}/users/cart`,
        headers: {
            authToken
        },
        data: {
            cart
        }
    })
}
export const getUserCart = async (authToken) => {
    return await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API}/users/cart`,
        headers: {
            authToken
        },
    })
}
export const getUserWishlist = async (authToken) => {
    return await axios({
        methos: 'GET',
        url: `${process.env.REACT_APP_API}/users/wishlist`,
        headers: {
            authToken
        }
    })
}