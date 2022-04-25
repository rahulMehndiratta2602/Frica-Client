import { useEffect, useState } from 'react'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi'

const DashboardFilters = ({ filter, setFilter, initialFilter, showHeader }) => {
    const [show, setShow] = useState(showHeader)
    const paymentStatuses = ["paid", 'unpaid', 'any']
    const orderStatuses = ["Not Processed", "Processing", "Dispatched", "Cancelled", "Delivered", 'any']
    const paymentTypes = ["card", "cash on delivery", 'any']
    const handleChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        setShow(showHeader)
    }, [showHeader])
    return (
        <div className={` relative overflow-hidden lg:h-[190px] overflow-y-scroll scrollhost ${show ? " max-h-auto " : " max-h-8 "}`}>
            {!show && <div className="absolute bg-white text-black  font-bold rounded-full top-1 left-1 text-base cursor-pointer z-50" onClick={() => setShow(true)}><HiChevronDown className="w-5 h-5" /></div>}
            {show && <div className="absolute bg-white text-black  font-bold rounded-full top-1 left-1 text-base cursor-pointer z-50" onClick={() => setShow(false)}><HiChevronUp className="w-5 h-5" /></div>}
            <div className={`w-full relative grid lg:grid-cols-2 sm:grid-cols-1 sm:space-y-1 lg:space-y-[1px] py-1 justify-items-center justify-center  bg-light transition-all duration-100 ease-linear ${show ? "translate-y-0" : "translate-y-[-100%]"}`}>
                <div className="text-center w-full lg:col-span-2 col-span-1 ">
                    <button className="bg-white px-2 mb-2 rounded-sm hover:text-lightest hover:bg-secondary"
                        onClick={() => setFilter(initialFilter)}
                    >Clear Filters</button>
                </div>
                <div className="  order-header-label-wrapper-borderless ">
                    <label className="order-header-label">Order Status</label>
                    <select name="orderStatus" value={filter.orderStatus} onChange={handleChange} className={`text-xs ${["Not Processed", "Cancelled"].includes(filter.orderStatus) ? "bg-red-600" : "bg-tertiary"} w-64 xs:w-52 leading-[22px] h-[22px] text-center text-white  outline-none `}>
                        {orderStatuses.map((status, i) => (
                            <option value={status} key={i} className={`text-xs bg-white w-64 xs:w-52 leading-[22px] text-center text-black h-max outline-none `}>{status.toUpperCase()}</option>
                        ))}
                    </select>
                </div>
                <div className="  order-header-label-wrapper-borderless ">
                    <label className="order-header-label">Payment Status</label>
                    <select name="paymentStatus" value={filter.paymentStatus} onChange={handleChange} className={`text-xs ${["unpaid"].includes(filter.paymentStatus) ? "bg-red-600" : "bg-tertiary"} w-64 xs:w-52 leading-[22px] h-[22px] text-center text-white  outline-none `}>
                        {paymentStatuses.map((status, i) => (
                            <option value={status} key={i} className={`text-xs bg-white w-64 xs:w-52 leading-[22px] text-center text-black h-max outline-none `}>{status.toUpperCase()}</option>
                        ))}
                    </select>
                </div>
                <div className=" order-header-label-wrapper-borderless">
                    <label className="order-header-label">Order Id</label>
                    <input name="orderId" type="text" className="order-header-input" value={filter.orderId} onChange={handleChange} />
                </div>
                <div className=" order-header-label-wrapper-borderless">
                    <label className="order-header-label">Payment Id</label>
                    <input name="paymentId" type="text" className="order-header-input" value={filter.paymentId} onChange={handleChange} />
                </div>
                <div className=" order-header-label-wrapper-borderless">
                    <label className="order-header-label">User Id</label>
                    <input name="userId" type="text" className="order-header-input" value={filter.userId} onChange={handleChange} />
                </div>
                <div className=" order-header-label-wrapper-borderless">
                    <label className="order-header-label">User Email</label>
                    <input name="userEmail" type="text" className="order-header-input" value={filter.userEmail} onChange={handleChange} />
                </div>
                <div className=" order-header-label-wrapper-borderless">
                    <label className="order-header-label">Payment Type</label>
                    <select name="paymentType" value={filter.paymentType} onChange={handleChange} className={`text-xs  w-64 xs:w-52 leading-[22px] h-[22px] text-center text-black bg-white  outline-none `}>
                        {paymentTypes.map((type, i) => (
                            <option value={type} key={i} className={`text-xs bg-white w-64 xs:w-52 leading-[22px] text-center text-black h-max outline-none `}>{type.toUpperCase()}</option>
                        ))}
                    </select>
                </div>
                <div className=" order-header-label-wrapper-borderless">
                    <label className="order-header-label">Ordered On</label>
                    <input name="orderedOn" type="date" className="order-header-input" value={filter.orderedOn} onChange={handleChange} />
                </div>
            </div>
        </div>
    )
}

export default DashboardFilters
