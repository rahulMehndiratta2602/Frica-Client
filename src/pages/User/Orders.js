import { useEffect, useState } from "react"
import { WiDirectionLeft } from "react-icons/wi"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import OrderHeader from "../../components/OrderHeader"
import OrderTable from "../../components/OrderTable"
import { fetchOrders } from "../../functions/order"


const Orders = () => {
    const { user } = useSelector(state => ({ ...state }))
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        if (user && user.token)
            fetchOrders(user.token).then(res => {
                setOrders(res.data.orders)
            })
                .catch(err => console.log(err.response.data.message))
    }, [user])

    return (
        <div className="overflow-hidden overflow-y-scroll scrollhost h-full  w-full relative">
            {orders.length === 0 ?
                <div className="w-full flex flex-col items-center justify-center bg-white font-montserrat  py-8 px-4">
                    <h1 className="text-base xs:text-2xl font-medium text-black">You have not placed any orders.</h1>

                    <button className="bg-primary text-white flex items-center space-x-1 px-2 py-1 hover:bg-secondary rounded-sm"
                        onClick={() => navigate('/shop')}>
                        <WiDirectionLeft className="text-md xxs:text-lg"
                            onClick={() => navigate('/shop')}
                        /><span className="text-xs xxs:text-sm">Continue Shopping</span>
                    </button>

                </div>
                :
                <div className="flex flex-col  space-y-8 w-full relative">
                    <h1 className="text-base xs:text-2xl py-2 bg-slate-700  text-white text-center font-semibold">Your Orders</h1>
                    {
                        orders.map((order) => (
                            <div className="" key={order._id}>
                                <OrderHeader order={order} />
                                <OrderTable order={order} />

                                <div className="w-full bg-slate-400  h-[1px] my-2 relative" ></div>
                            </div>
                        ))
                    }


                </div>
            }
        </div>
    )
}

export default Orders
