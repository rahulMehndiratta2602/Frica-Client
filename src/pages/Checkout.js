import axios from "axios"
import { useEffect, useState } from "react"
import { WiDirectionLeft } from "react-icons/wi"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { createOrUpdateUser } from "../functions/auth"
import { getUserCart } from "../functions/user"
import CheckoutSummary from "../components/CheckoutSummary"
import { useNavigate } from "react-router"
import { handleCouponApply } from "../functions/cart"


const Checkout = () => {
    const [checkOutCart, setCheckOutCart] = useState({ products: [], cartTotal: 0, totalAfterDiscount: 0 })
    const { user, cart } = useSelector(state => ({ ...state }))
    const [address, setAddress] = useState("")
    const [coupon, setCoupon] = useState("")
    const [couponErrorMessage, setCouponErrorMessage] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (user && user.token)
            setAddress(user.address)
    }, [])
    useEffect(() => {
        if (user && user.token) {
            setAddress(user.address)
            getUserCart(user.token).then(res => {
                setCheckOutCart(res.data)
            }).catch(err => console.log(err.response.data.message))
        }
    }, [user])
    const handleAddress = () => {
        createOrUpdateUser(user.token, address)
            .then(res => {
                toast.success('Address Updated')
                dispatch({
                    type: "UPDATE_USER",
                    payload: {
                        ...user,
                        address: res.data.user.address
                    }
                })
            })
            .catch(err => console.log(err))
    }


    useEffect(() => {
        if (user && user.token && cart.coupon) {
            setCoupon(cart.coupon?.name)
            handleCouponApply(cart.coupon?.name, user.token, cart, dispatch, setCouponErrorMessage)
        }
    }, [user])
    useEffect(() => {
        if (!cart.products.length)
            navigate('/cart')
    }, [])
    return (
        <div className="grid grid-cols-12 gap-x-4 px-2 py-8 bg-slate-800 bg-opacity-80">
            <div className="col-span-12 lg:col-span-7 rounded-md bg-white text-text py-4 px-4">
                <div className="flex flex-col items-center justify-center font-montserrat space-y-4">
                    <a href="/cart" className="mr-auto !mb-0 flex items-center text-primary text-[12px] hover:text-secondary"><WiDirectionLeft className="text-sm mr-1" />Back to Cart</a>
                    <h1 className="font-semibold text-2xl mr-auto  mb-0">Delivery Address</h1>
                    <textarea spellCheck="false" autoComplete="false" name="address" id="address" value={address || ""} onChange={(e) => setAddress(e.target.value)}
                        className="resize-none h-24 w-full ring-slate-400 ring-2 rounded-md focus:ring-slate-700 focus:border-none focus:outline-none px-2 py-2 "></textarea>
                    <button className="bg-primary hover:bg-secondary text-white px-2 py-1 rounded-sm ml-auto " onClick={handleAddress}>Save</button>
                    {/* <div className={`w-full bg-slate-400  h-[1px] mb-2 relative `} ></div> */}
                    <div className="flex mr-auto xs:space-x-4 xs:items-center flex-col space-y-1 items-start xs:flex-row">
                        <h1 className="font-semibold text-xs xxs:text-sm xs:text-lg text-secondary xs:mb-0"> Got Coupon?</h1>
                        <input type="text" name="coupon" id="coupon" className="w-[120px] px-1 h-5 text-xs ring-slate-400 ring-2 rounded-sm focus:ring-slate-700 focus:border-none focus:outline-none" spellCheck="false" autoComplete="off"
                            value={coupon.toUpperCase()} onChange={e => {
                                setCouponErrorMessage('')
                                setCoupon(e.target.value)
                            }}
                        />
                        <button className="bg-tertiary hover:bg-secondary text-white px-2 py-[2px] text-xs xxs:text-sm rounded-sm xs:ml-auto " onClick={() => handleCouponApply(coupon, user.token, cart, dispatch, setCouponErrorMessage)}>Apply</button>
                        {couponErrorMessage && <span className="text-white bg-red-600 px-2">{couponErrorMessage}</span>}
                    </div>
                </div>
            </div>
            <CheckoutSummary checkOutCart={checkOutCart} />
        </div>
    )
}

export default Checkout
