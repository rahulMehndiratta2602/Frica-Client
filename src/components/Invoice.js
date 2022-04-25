import React from "react"
const tableHeadings = ["S.No", "Image", "Title", "Qty", "Color", "Price", "Total"]

const Invoice = React.forwardRef(({ order }, ref) => {
    return (
        <div ref={ref} className="bg-white hidden print:block absolute top-0 left-0 w-screen h-screen px-4">
            <div className="w-full flex items-center justify-center pt-4 pb-2">
                <img src='/img/logo.png' className=" w-[150px] aspect-auto" />
            </div>
            <div className=" grid grid-cols-2 gap-y-2 justify-center justify-items-center py-4  gap-x-4 text-center ">
                <div className="order-1 order-header-label-wrapper-borderless">
                    <label className="order-header-label">Invoice Date</label>
                    <p className="text-white bg-secondary">{order.createdAt.split('T')[0]}</p>
                </div>
                <div className="order-2 order-header-label-wrapper-borderless">
                    <label className="order-header-label">Payment Type</label>
                    <p className="text-white bg-secondary">{order.checkoutSession.payment_method_types[0].toUpperCase()}</p>
                </div>
                <div className="order-3 order-header-label-wrapper-borderless">
                    <label className="order-header-label">Order Id</label>
                    <p className="text-white bg-secondary">{order._id}</p>
                </div>
                <div className="order-4 order-header-label-wrapper-borderless">
                    <label className="order-header-label">Payment Id</label>
                    <p className="text-white bg-secondary">{order.checkoutSession.payment_intent}</p>
                </div>
            </div>
            <table className="text-xs xs:text-sm w-full relative bg-white">
                <thead className="w-full">
                    <tr>
                        {tableHeadings.map((heading, index) => <th key={index} className={`table-heading text-[9px] xxs:text-xs `}>{heading}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {
                        order.products?.map((product, i) => {
                            return (
                                <tr key={i} className={`${i === 0 ? " border-slate-300 border-x-[1px] "
                                    : " border-slate-300 border-[1px] "} `}>
                                    <th className="table-body-heading xs:px-4 ">{i + 1}</th>
                                    <th className="table-body-heading xs:px-4 flex items-center justify-center"><img src={product.product.images[0].url} className="rounded-lg w-[100px] aspect-square" alt="" /></th>
                                    <th className="table-body-heading xs:px-4 ">{product.product.brand.toUpperCase()}-{product.product.title}</th>
                                    <th className="table-body-heading xs:px-4 ">{product.count}</th>
                                    <th className="table-body-heading xs:px-4 ">{product.color}</th>
                                    <th className="table-body-heading xs:px-4 ">{product.product.price}</th>
                                    <th className="table-body-heading xs:px-4 ">{product.product.price * product.count}</th>
                                </tr>)
                        })
                    }
                    <tr className="border-slate-300 border-x-[1px]">
                        <th colSpan={tableHeadings.length - 1} className="bg-secondary text-white text-[12px] xxs:text-xs">Total</th>
                        <th className="bg-primary  text-[12px] xxs:text-xs text-white py-2">Rs {order.checkoutSession.amount_subtotal / 100}</th>

                    </tr>
                    <tr className="border-slate-300 border-x-[1px]">
                        <th colSpan={tableHeadings.length - 1} className="bg-slate-500 text-white text-[12px] xxs:text-xs">Amount (After Discount ({((order.checkoutSession.amount_subtotal - order.checkoutSession.amount_total) / order.checkoutSession.amount_subtotal * 100).toFixed(2)}%))</th>
                        <th className="bg-primary  text-[12px] xxs:text-xs text-white py-2">Rs {order.checkoutSession.amount_total / 100}</th>

                    </tr>

                </tbody>
            </table>
            <footer className="w-full text-base  text-center text-white mt-4 py-1 font-semibold bg-primary" >Thank you for shopping with us.</footer>
        </div>
    )
})

export default Invoice
