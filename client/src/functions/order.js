import axios from "axios"

export const fetchOrders = async (token) => {
    return await axios({
        method: "GET",
        headers: { authToken: token },
        url: `${process.env.REACT_APP_API}/users/order`
    })
}
export const placeOrderOnline = async (token, cart, stripe) => {
    return await axios({
        method: 'POST',
        headers: {
            authToken: token
        },
        data: {
            cart
        },
        url: `${process.env.REACT_APP_API}/payments`
    }).then(async res => {
        const { sessionId } = res.data
        await stripe.redirectToCheckout({ sessionId })
    })
        .catch(err => console.log(err.response.data.message))
}

export const createOrder = async (session_id, token) => {
    if (session_id) {
        return await axios({
            method: "POST",
            url: `${process.env.REACT_APP_API}/users/order`,
            headers: { authToken: token },
            data: {
                session_id
            }

        }).then(res => console.log(res.data))
            .catch(err => console.log(err.response.data.message))
    }
}
export const createCODOrder = async (token, navigate) => {
    await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API}/users/order`,
        headers: { authToken: token },

    }).then(res => {
        console.log(res.data)
        navigate(`/payments/success?id=${res.data.order.checkoutSession.id}`)
    })
}
export const getAdminOrders = async (token) => {
    return await axios.get(`${process.env.REACT_APP_API}/adminOrders`, { headers: { authToken: token } })
}
export const updateAdminOrder = async (token, orderId, body) => {
    return await axios({
        method: "PATCH",
        url: `${process.env.REACT_APP_API}/adminOrders/orderId/${orderId}`,
        headers: { authToken: token },
        data: { ...body }
    })
}