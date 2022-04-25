import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CartProduct from "../components/CartProduct"
import { useNavigate } from "react-router"
import { userCart } from "../functions/user"

const Cart = () => {
    const { cart, user } = useSelector(state => ({ ...state }))
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleClear = () => {
        if (window.confirm("You are about to empty your cart?"))
            dispatch({
                type: "REMOVE_FROM_CART",
                payload: { ...cart, products: [], cartTotal: 0 }
            })
    }
    const saveCartToDB = () => {
        userCart(cart.products, user.token)
            .then(res => {
                if (res.data.status === "success")
                    navigate('/checkout')
            })
            .catch(err => console.log(err.response.data.message))
    }
    const handleCheckoutClick = () => {
        if (user && user.token) {
            saveCartToDB()
        }
        else {
            navigate('/login', { state: { from: '/cart' } })
        }
    }

    return (
        <div className="grid grid-cols-12 gap-x-4 bg-slate-800 bg-opacity-80 px-2 py-2">
            <div className="col-span-12 lg:col-span-8  rounded-md  bg-white text-text ">
                <div className="font-montserrat w-full relative  px-2 xs:px-8 md:px-12 md:py-4 lg:py-8 py-2">
                    {
                        cart && cart.products?.length
                            ? <div className="flex flex-row space-x-4 mb-2 md:mb-0">
                                <h1 className="text-sm xxs:text-2xl font-semibold">Shopping Cart
                            <span className="text-xs xxs:text-sm ml-2 relative bottom-[2px]">({cart.products.length})</span>
                                </h1>
                                <button className="bg-red-600  bg-opacity-40 w-max text-white px-8 py-1 h-8 hover:bg-opacity-100 rounded-sm" onClick={handleClear}>Clear</button>
                            </div>
                            : <h1 className="text-base xs:text-2xl font-semibold">Your Frica Cart is empty.
                     <a href="/shop" className="xs:text-base text-xs block hover:text-secondary underline">{"Back to Shopping"}</a>
                            </h1>
                    }
                    <div className={`w-full bg-slate-400  h-[1px] mb-2 relative ${cart.products?.length ? "inline-block" : "hidden"}`} >
                        <span className="absolute right-2 text-xs text-slate-500 -top-5 hidden xs:inline-block">Price</span>
                    </div>
                    <div className={`${cart.products?.length ? "flex" : "hidden"} flex-col relative w-full space-y-2 lg:h-[62.5vh] md:h-[50.5vh] xs:h-[51.5vh] xxs:h-[53vh] h-[56vh]  overflow-hidden overflow-y-scroll scrollhost`}>
                        {
                            cart.products?.map((item, index) => {
                                return (
                                    <CartProduct item={item} index={index} key={item._id} />
                                )
                            })
                        }
                    </div>

                </div>
            </div>
            <div className={`col-span-12 -order-1 lg:order-2 lg:col-span-4 lg:h-max   bg-white px-2 xs:px-8 font-montserrat xs:my-2 lg:my-8 my-1 rounded-lg ${cart.products?.length ? "flex" : "hidden"} flex-col lg:space-y-4 space-y-2 py-4 lg:w-[100%] w-full`}>
                <div className="xs:text-xl lg:text-lg xl:text-xl text-md xxs:text-lg font-semibold ">
                    Subtotal({cart.products?.length} items):
                    <span className="xs:text-sm lg:text-sm xl:text-base text-xs xxs:text-sm ml-2">{`Rs ${cart.cartTotal}`}</span>
                </div>
                <button className="px-4 text-white bg-tertiary w-max rounded-sm py-1 hover:opacity-80" onClick={() => {
                    handleCheckoutClick()
                }} >{user && user.token ? "Proceed to Checkout" : "Login to Checkout"}</button>
            </div>
        </div>
    )
}

export default Cart
