import { useEffect, useState } from "react"
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'
import { useSelector } from "react-redux"
import { updateAdminOrder } from "../functions/order"
const orderStatuses = ["Not Processed", "Processing", "Dispatched", "Cancelled", "Delivered"]
const paymentStatuses = ["paid", 'unpaid']
const AdminOrderHeader = ({ order, showHeader }) => {
    const [show, setShow] = useState(showHeader)
    const [orderStatus, setOrderStatus] = useState(order.orderStatus)
    const [paymentStatus, setPaymentStatus] = useState(order.checkoutSession.payment_status)
    const { user } = useSelector(state => ({ ...state }))
    const date = new Date(order.createdAt)
    const orderedOn = `${date.getDate().toString().padStart(2, 0)}-${(date.getMonth() + 1).toString().padStart(2, 0)}-${date.getFullYear()}`
    useEffect(() => {
        setShow(showHeader)
    }, [showHeader])
    useEffect(() => {
        if (user && user.token)
            updateAdminOrder(user.token, order._id, { paymentStatus, orderStatus })
    }, [paymentStatus, orderStatus, user])
    return (
        <div className={`relative overflow-hidden ${show ? "max-h-[600px]" : "max-h-8"} origin-top transition-all duration-200 ease-linear`} >
            {!show && <div className="absolute bg-white text-black  font-bold rounded-full top-1 left-1 text-base cursor-pointer z-50" onClick={() => setShow(true)}><HiChevronDown className="w-5 h-5" /></div>}
            {show && <div className="absolute bg-white text-black  font-bold rounded-full top-1 left-1 text-base cursor-pointer z-50" onClick={() => setShow(false)}><HiChevronUp className="w-5 h-5" /></div>}
            <div className={` grid xs:grid-cols-1 lg:grid-cols-2 gap-y-1 justify-center justify-items-center py-2 gap-x-0 bg-slate-300 grid-dense transition-all duration-200 ease-linear ${show ? "translate-y-0" : "translate-y-[-100%]"}`}>
                <div className="flex lg:row-span-3 flex-col xs:flex-row bg-white h-[82px] xs:h-[72px]  justify-center  border-black border-[1px]">
                    <label className="bg-slate-600 justify-center leading-[22px] items-center flex text-xs text-white w-64 xs:w-48 h-inherit">Shipping Address</label>
                    <p className="bg-white break-words w-64 xs:w-52 relative h-[60px] xs:h-[72px] text-xs px-1">{order.orderedBy.address}</p>
                </div>
                <div className=" order-header-label-wrapper">
                    <label className="order-header-label">User Id</label>
                    <p className="order-header-p">{order.orderedBy._id}</p>
                </div>
                <div className=" order-header-label-wrapper">
                    <label className="order-header-label">User Email</label>
                    <p className="order-header-p">{order.orderedBy.email}</p>
                </div>
                <div className=" order-header-label-wrapper">
                    <label className="order-header-label">User Name</label>
                    <p className="order-header-p">{order.orderedBy.name}</p>
                </div>
                <div className=" order-header-label-wrapper">
                    <label className="order-header-label">Ordered On</label>
                    <p className="order-header-p">{orderedOn}</p>
                </div>
                <div className=" order-header-label-wrapper">
                    <label className="order-header-label">Payment Type</label>
                    <p className="order-header-p">{order.checkoutSession.payment_method_types[0].toUpperCase()}</p>
                </div>
                <div className=" order-header-label-wrapper">
                    <label className="order-header-label">Order Id</label>
                    <p className="order-header-p">{order._id}</p>
                </div>
                <div className=" order-header-label-wrapper">
                    <label className="order-header-label">Order Status</label>
                    <select value={orderStatus} onChange={e => setOrderStatus(e.target.value)} className={`text-xs ${["Not Processed", "Cancelled"].includes(orderStatus) ? "bg-red-600" : "bg-tertiary"} w-64 xs:w-52 leading-[22px] h-[22px] text-center text-white  outline-none `}>
                        {orderStatuses.map((status, i) => (
                            <option value={status} key={i} className={`text-xs bg-white w-64 xs:w-52 leading-[22px] text-center text-black h-max outline-none `}>{status.toUpperCase()}</option>
                        ))}
                    </select>
                </div>
                <div className=" order-header-label-wrapper">
                    <label className="order-header-label">Payment Id</label>
                    <p className="order-header-p">{order.checkoutSession.payment_intent}</p>
                </div>
                <div className=" order-header-label-wrapper">
                    <label className="order-header-label">Payment Status</label>
                    <select value={paymentStatus} onChange={e => setPaymentStatus(e.target.value)} className={`text-xs ${["unpaid"].includes(paymentStatus) ? "bg-red-600" : "bg-tertiary"} w-64 xs:w-52 leading-[22px] h-[22px] text-center text-white  outline-none `}>
                        {paymentStatuses.map((status, i) => (
                            <option value={status} key={i} className={`text-xs bg-white w-64 xs:w-52 leading-[22px] text-center text-black h-max outline-none `}>{status.toUpperCase()}</option>
                        ))}
                    </select>
                </div>

            </div>
        </div>
    )
}

export default AdminOrderHeader
