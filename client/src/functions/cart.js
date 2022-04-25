import axios from "axios"
import lodash from "lodash"

export const handleAddToCart = (product, dispatch, initialCart) => {
    let cart = []
    if (typeof window !== undefined) {
        // if cart is present in local storage GET it
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart')).products

        }
        //push new product to cart
        cart.push({
            ...product,
            count: 1
        })
        //make sure that we do not add duplicate products but we can increase the quantity in cart itself
        let uniqueCart = lodash.uniqWith(cart, (a, b) => a.title === b.title)
        const totalPrice = uniqueCart?.reduce((acc, item) => acc + item.price * item.count, 0)
        localStorage.setItem('cart', JSON.stringify({ ...initialCart, products: uniqueCart, cartTotal: totalPrice }))
        dispatch({
            type: "ADD_TO_CART",
            payload: { ...initialCart, products: uniqueCart, cartTotal: totalPrice },
        })
        if (cart.length === uniqueCart.length)
            dispatch({
                type: "SHOW_MODAL",
                payload: { show: true, title: product.title, itemPresent: false },
            })
        else
            dispatch({
                type: "SHOW_MODAL",
                payload: { show: true, title: product.title, itemPresent: true },

            })


    }


    document.querySelector('body').classList.add('modal-open')
}
export const handleCouponApply = async (coupon, token, cart, dispatch, setCouponErrorMessage) => {
    // console.log(coupon)
    await axios({
        method: "POST",
        url: coupon ? `${process.env.REACT_APP_API}/users/coupon/${coupon.toUpperCase()}` : `${process.env.REACT_APP_API}/users/coupon/${"AB".toUpperCase()}`,
        headers: { authToken: token }
    }).then(res => {
        // console.log(res.data)
        dispatch({
            type: "UPDATE_CART",
            payload: { ...cart, coupon: res.data.cart.coupon, totalAfterDiscount: res.data.cart.totalAfterDiscount }
        })
        setCouponErrorMessage("")
    })
        .catch(err => {
            setCouponErrorMessage(err.response.data.message)
            dispatch({
                type: "UPDATE_CART",
                payload: { ...cart, coupon: "", totalAfterDiscount: 0 }
            })
        })
}
