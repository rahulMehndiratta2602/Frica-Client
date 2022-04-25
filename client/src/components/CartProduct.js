import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"


const colors = ["Black", "Brown", "Silver", "White", "Blue", "Red", "Golden", "Green"]
const CartProduct = ({ item, index }) => {
    const dispatch = useDispatch()
    const { cart, filter } = useSelector(state => ({ ...state }))
    const navigate = useNavigate()
    // const [color, setColor] = useState(item.color)
    // const [qty, setQty] = useState(1)
    const handleDelete = () => {
        const newProducts = [...cart.products].filter((cartItem) => cartItem._id !== item._id)
        const newTotal = newProducts?.reduce((acc, item) => acc + item.price * item.count, 0)
        dispatch({
            type: "REMOVE_FROM_CART",
            payload: { ...cart, products: newProducts, cartTotal: newTotal }
        })
    }
    const handleRelated = (catId) => {
        dispatch({
            type: "UPDATE_FILTER",
            payload: { ...filter, category: catId }
        })
        navigate('/shop')
    }
    const handleChange = (e) => {
        // console.log(e.target.name, e.target.value)
        const newProducts = [...cart.products].map((product) => {
            if (product._id === item._id) {
                if (e.target.name === "count") {
                    // item.count > 1 ? (item.count <= item.quantity ? item.count : item.quantity) : 1
                    const newCount = e.target.value > 1 ? (e.target.value <= item.quantity ? e.target.value : item.quantity) : 1
                    product["count"] = newCount
                }
                else
                    product[e.target.name] = e.target.value
            }
            return product
        })
        const newTotal = newProducts?.reduce((acc, item) => acc + item.price * item.count, 0)
        dispatch({
            type: "UPDATE_CART",
            payload: { ...cart, products: newProducts, cartTotal: newTotal }
        })
    }
    return (
        <div >
            <div className="flex xxs:flex-row xxs:justify-between flex-col items-center justify-center mb-2 xxs:space-x-2 xs:space-x-4">
                <img src={item.images[0].url} alt={item.name}
                    className="rounded-lg xxs:bg-black xxs:bg-opacity-10 xxs:px-2 w-full relative xxs:w-[160px] py-2 xxs:aspect-square object-contain" />
                <div className="flex flex-col py-1 justify-center items-center xs:px-4 px-2 w-full">
                    <div className="font-semibold text-base">
                        {`${item.brand.toUpperCase()} - ${item.title}`}
                    </div>
                    <p className="text-xs text-slate-500">{item.shipping === "Yes" ? "Eligible for free shipping" : "Not Eligible for free shipping"}</p>
                    <p className="text-xs font-medium text-red-500">{item.quantity} items left in stock</p>
                    <div className="flex space-x-2 items-center">
                        <span className="text-xs text-slate-800 ">Color</span>
                        <select
                            name="color"
                            className="block h-[20px] ring-1 ring-slate-400 text-xs text-gray-700 bg-white rounded-sm !px-1  focus:ring-2 focus:ring-slate-500 focus:outline-none w-[80px]"
                            id="color"
                            value={item.color}
                            onChange={e => {
                                handleChange(e)
                            }}
                        >
                            {
                                colors.length > 0 && colors.map((col, index) => {
                                    return <option className="text-primary text-xs bg-white " key={index} value={col}>{col}</option>
                                })}
                        </select>
                    </div>
                    <div className="flex space-x-[17px] items-center mt-2">
                        <span className="text-xs text-slate-800 ">Qty</span>
                        <input type="number" min={1} name="count" id="count" className="block h-[20px] ring-1 ring-slate-400 text-xs text-gray-700 bg-white rounded-sm !px-1  focus:ring-2 focus:ring-slate-500 focus:outline-none w-[80px]" value={item.count} onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="text-xs mt-2 font-semibold inline-block xs:hidden ">
                        Rs{item.price}
                    </div>
                    <a className="text-xs mt-2" onClick={() => handleRelated(item.category)}>See Related Items</a>
                    <button className="bg-red-600  mt-2 bg-opacity-40 w-max text-white px-2 py-[2px] h-max text-xs hover:bg-opacity-100 rounded-sm" onClick={handleDelete}>Remove from Cart</button>
                </div>
                <div className="text-xs xxs:ml-auto font-semibold hidden xs:inline-block w-[100px]">
                    Rs{item.price}
                </div>
            </div>
            <div className="w-full bg-slate-400 h-[1px]"></div>
        </div>
    )
}

export default CartProduct
