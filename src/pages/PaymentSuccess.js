import { useEffect } from "react"
import { WiDirectionLeft } from "react-icons/wi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { useSearchParams } from "react-router-dom"
import { createOrder } from "../functions/order"
const PaymentSuccess = () => {
    const navigate = useNavigate()
    const { user } = useSelector(state => ({ ...state }))
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        const { session_id } = Object.fromEntries(searchParams)
        if (user && user.token) {
            createOrder(session_id, user.token)
        }
    }, [user])
    useEffect(() => {
        dispatch({
            type: "UPDATE_CART",
            payload: {
                products: [],
                cartTotal: 0,
                coupon: "",
                totalAfterDiscount: 0,
            }
        })
    }, [])
    return (
        <div className="w-full flex flex-col items-center justify-center bg-white font-montserrat py-8 px-4">
            <h1 className="text-base xs:text-2xl font-semibold text-tertiary">Your order has been placed. Thank you for shopping with us.</h1>

            <button className="bg-primary text-white flex items-center space-x-1 px-2 py-1 hover:bg-secondary rounded-sm"
                onClick={() => navigate('/shop')}>
                <WiDirectionLeft className="text-md xxs:text-lg"
                    onClick={() => navigate('/shop')}
                /><span className="text-xs xxs:text-sm">Continue Shopping</span>
            </button>
            <button className="bg-tertiary text-white flex items-center space-x-1 mt-4 px-2 py-1 hover:bg-secondary rounded-sm"
                onClick={() => navigate('/user/orders')}>
                <WiDirectionLeft className="text-md xxs:text-lg"
                    onClick={() => navigate('/user/orders')}
                />
                <span className="text-xs xxs:text-sm">My Orders</span>
            </button>

        </div>
    )
}

export default PaymentSuccess
