let initialState = {
    products: [],
    cartTotal: 0,
    coupon: "",
    totalAfterDiscount: 0,
}

if (typeof window !== undefined) {
    // if cart is present in local storage GET it
    if (localStorage.getItem('cart')) {
        initialState = JSON.parse(localStorage.getItem('cart'))
    }
    initialState.cartTotal = initialState.products.reduce((acc, item) => acc + item.price * item.count, 0)
    localStorage.setItem('cart', JSON.stringify(initialState))
}
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return action.payload
        case "REMOVE_FROM_CART":
            window.localStorage.setItem('cart', JSON.stringify(action.payload))
            return action.payload
        case "UPDATE_CART":
            window.localStorage.setItem('cart', JSON.stringify(action.payload))
            return action.payload
        default:
            return state
    }
}

export default cartReducer
