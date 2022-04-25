const OrderTable = ({ order }) => {
    const tableHeadings = ["S.No", "Image", "Title", "Qty", "Color", "Price", "Total"]
    return (
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
                                <th className="table-body-heading xs:px-4 flex items-center justify-center"><img src={product.product.images[0].url} className="rounded-lg xxs:bg-black xxs:bg-opacity-10 xxs:px-2 w-full relative xxs:w-[160px] py-2 xxs:aspect-square object-contain" alt="" /></th>
                                <th className="table-body-heading xs:px-4 ">{product.product.brand.toUpperCase()}-{product.product.title}</th>
                                <th className="table-body-heading xs:px-4 ">{product.count}</th>
                                <th className="table-body-heading xs:px-4 ">{product.color}</th>
                                <th className="table-body-heading xs:px-4 ">{product.product.price}</th>
                                <th className="table-body-heading xs:px-4 ">{product.product.price * product.count}</th>
                            </tr>)
                    })
                }
                <tr className="border-slate-300 border-x-[1px]">
                    <th colSpan={tableHeadings.length - 1} className="bg-secondary text-white text-[9px] xxs:text-xs">Total</th>
                    <th className="bg-primary  text-[9px] xxs:text-xs text-white ">Rs {order.checkoutSession.amount_subtotal / 100}</th>

                </tr>
                <tr className="border-slate-300 border-x-[1px]">
                    <th colSpan={tableHeadings.length - 1} className="bg-slate-500 text-white text-[9px] xxs:text-xs">Amount( After Discount ({((order.checkoutSession.amount_subtotal - order.checkoutSession.amount_total) / order.checkoutSession.amount_subtotal * 100).toFixed(2)}%) )</th>
                    <th className="bg-primary  text-[9px] xxs:text-xs text-white ">Rs {order.checkoutSession.amount_total / 100}</th>

                </tr>

            </tbody>
        </table>
    )
}

export default OrderTable
