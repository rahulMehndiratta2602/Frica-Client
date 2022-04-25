import { useRef } from "react"
import ReactToPrint from "react-to-print"
import Invoice from "./Invoice"

const OrderHeader = ({ order }) => {
    const componentRef = useRef(null)
    return (
        <div className=" grid xs:grid-cols-1 lg:grid-cols-2 gap-y-1 justify-center justify-items-center py-2 gap-x-0 bg-slate-300">
            <div className="order-1 order-header-label-wrapper">
                <label className="order-header-label">Ordered On</label>
                <p className="order-header-p">{order.createdAt.split('T')[0]}</p>
            </div>
            <div className="order-2 order-header-label-wrapper">
                <label className="order-header-label">Payment Type</label>
                <p className="order-header-p">{order.checkoutSession.payment_method_types[0].toUpperCase()}</p>
            </div>
            <div className="order-3 order-header-label-wrapper">
                <label className="order-header-label">Order Id</label>
                <p className="order-header-p">{order._id}</p>
            </div>
            <div className="order-4 order-header-label-wrapper">
                <label className="order-header-label">Order Status</label>
                <p className={`text-xs ${["Not Processed", "Cancelled"].includes(order.orderStatus) ? "bg-red-600" : "bg-tertiary"} w-64 xs:w-52 leading-[22px] text-center text-white h-max`}>{order.orderStatus.toUpperCase()}</p>
            </div>
            <div className="order-5 order-header-label-wrapper">
                <label className="order-header-label">Payment Id</label>
                <p className="order-header-p">{order.checkoutSession.payment_intent}</p>
            </div>
            <div className="order-6 order-header-label-wrapper">
                <label className="order-header-label">Payment Status</label>
                <p className={`text-xs ${order.checkoutSession.payment_status === 'paid' ? "bg-tertiary" : "bg-red-600"} w-64 xs:w-52 leading-[22px] text-center text-white h-max`}>{order.checkoutSession.payment_status.toUpperCase()}</p>
            </div>
            <Invoice order={order} ref={componentRef} />
            <ReactToPrint
                trigger={() => (
                    <button className="order-7 lg:col-span-2 mt-4 text-xs bg-slate-800 hover:bg-secondary w-[256px] xs:w-[400px] leading-[22px] text-center text-white h-max">Download PDF</button>
                )}
                content={() => componentRef.current} />
        </div>
    )
}

export default OrderHeader
