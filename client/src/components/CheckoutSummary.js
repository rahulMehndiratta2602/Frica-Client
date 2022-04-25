import { createCODOrder, placeOrderOnline } from "../functions/order"
import { useStripe } from '@stripe/react-stripe-js'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"

const CheckoutSummary = ({ checkOutCart }) => {
    const { user, cart } = useSelector(state => ({ ...state }))
    const stripe = useStripe()
    const navigate = useNavigate()

    const tableHeadings = ["S.No", "Title", "Qty", "Color", "Price", "Total"]
    return (
        <div className={`col-span-12  lg:col-span-5 lg:h-max rounded-md bg-white px-2  font-montserrat xs:my-2 lg:my-8 my-1  flex flex-col space-y-4 lg:space-y-4 py-4 lg:w-[100%] w-full`}>
            <h1 className="text-primary font-semibold text-xs xs:text-lg">Order Summary</h1>
            <table className="text-xs xs:text-sm">
                <thead className="">
                    <tr>
                        {tableHeadings.map((heading, index) => <th key={index} className={`table-heading`}>{heading}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {
                        checkOutCart?.products?.map((product, i) => {
                            return (<tr key={i} className={`${i === 0 ? " border-slate-300 border-x-[1px] " : " border-slate-300 border-[1px] "} `}>
                                <th className="table-body-heading">{i + 1}</th>
                                <th className="table-body-heading">{product.product.title}</th>
                                <th className="table-body-heading">{product.count}</th>
                                <th className="table-body-heading">{product.color}</th>
                                <th className="table-body-heading">{product.price}</th>
                                <th className="table-body-heading">{product.price * product.count}</th>
                            </tr>)
                        })
                    }
                    <tr className="border-slate-300 border-x-[1px]">
                        <th colSpan={tableHeadings.length - 1} className="bg-secondary text-white ">Cart Total</th>
                        <th className="bg-primary  text-[9px] xxs:text-xs text-white ">Rs {checkOutCart.cartTotal}</th>
                    </tr>
                    {
                        cart.coupon ?
                            <tr className="border-slate-300 border-x-[1px]">
                                <th colSpan={tableHeadings.length - 1} className="bg-tertiary text-white  px-4">{cart.coupon.name} Coupon Applied (Discount {cart.coupon.discount}%) </th>
                                <th className="bg-primary  text-[9px] xxs:text-xs text-white ">Rs {cart.totalAfterDiscount}</th>
                            </tr> : <></>
                    }
                </tbody>
            </table>
            <div className="flex space-x-2 justify-center">
                <button disabled={!user?.address} className={`bg-tertiary text-white disabled:opacity-60 disabled:hover:bg-tertiary hover:bg-secondary px-2 py-1 w-max  rounded-sm`} onClick={() => placeOrderOnline(user.token, cart, stripe)}>Pay Online</button>
                <button disabled={!user?.address} className={`bg-primary text-white disabled:opacity-60 disabled:hover:bg-tertiary hover:bg-secondary px-2 py-1 w-max  rounded-sm`} onClick={() => createCODOrder(user.token, navigate)} >Cash On Delivery</button>
            </div>
        </div>
    )
}

export default CheckoutSummary
