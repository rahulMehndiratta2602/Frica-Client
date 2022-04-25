import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import AdminOrderHeader from "../../../components/AdminOrderHeader"
import OrderTable from "../../../components/OrderTable"
import { getAdminOrders } from "../../../functions/order"
import { CgChevronDoubleDown, CgChevronDoubleUp } from 'react-icons/cg'
import DashboardFilters from "../../../components/DashboardFilters"

const initialFilter = {
    show: true,
    orderStatus: 'any',
    paymentStatus: 'any',
    orderId: '',
    paymentId: '',
    userId: '',
    userEmail: '',
    paymentType: 'any',
    orderedOn: ''

}
const Dashboard = () => {

    const [orders, setOrders] = useState([])
    const { user } = useSelector(state => ({ ...state }))
    const [showHeader, setShowHeader] = useState(true)
    const [filter, setFilter] = useState(initialFilter)


    useEffect(() => {
        if (user && user.token) {
            getAdminOrders(user.token).then(res => {
                setOrders(res.data.orders)
            })
        }
    }, [user])

    const filteredOrders = (filter) => {
        const datesAreOnSameDay = (first, second) =>
            first.getFullYear() === second.getFullYear() &&
            first.getMonth() === second.getMonth() &&
            first.getDate() === second.getDate()
        return (order) =>
            (filter.orderStatus === 'any' ? true : order.orderStatus === filter.orderStatus)
            && (filter.paymentStatus === 'any' ? true : order.checkoutSession.payment_status === filter.paymentStatus)
            && (filter.paymentType === 'any' ? true : order.checkoutSession.payment_method_types[0] === filter.paymentType)
            && (filter.orderedOn === "" ? true : datesAreOnSameDay(new Date(order.createdAt), new Date(filter.orderedOn)))
            && (order._id.includes(filter.orderId))
            && (order.orderedBy._id.includes(filter.userId))
            && (order.checkoutSession.payment_intent.includes(filter.paymentId)) && (order.orderedBy.email.includes(filter.userEmail))
    }

    return (
        <div className="form-admin font-montserrat">
            {!showHeader && <div className="absolute bg-white text-black  font-bold rounded-full top-2 left-2 text-base cursor-pointer z-50" onClick={() => setShowHeader(true)}><CgChevronDoubleDown className="w-5 h-5" /></div>}
            {showHeader && <div className="absolute bg-white text-black  font-bold rounded-full top-2 left-2 text-base cursor-pointer z-50" onClick={() => setShowHeader(false)}><CgChevronDoubleUp className="w-5 h-5" /></div>}
            {/* <h1 className="text-white text-lg w-full text-center relative sm:right-8 font-semibold">All Orders</h1> */}
            <DashboardFilters filter={filter} setFilter={setFilter} initialFilter={initialFilter} showHeader={showHeader} />
            <div className="overflow-hidden overflow-y-scroll scrollhost h-full  w-full relative">
                {
                    orders.filter(filteredOrders(filter)).map((order) => (
                        <div className="" key={order._id}>
                            <AdminOrderHeader order={order} showHeader={showHeader} />
                            <OrderTable order={order} />

                            <div className="w-full bg-slate-400  h-[1px] my-2 relative" ></div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Dashboard
