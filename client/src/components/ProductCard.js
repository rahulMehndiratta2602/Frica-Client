import { DeleteFilled, EditFilled, EyeOutlined } from "@ant-design/icons"
import { BsCartPlus } from 'react-icons/bs'
import { useLocation, useNavigate } from "react-router"
import StarRatings from 'react-star-ratings'
import { Tooltip } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { handleAddToCart } from "../functions/cart"
import { TiDelete } from 'react-icons/ti'
import { removeFromWishlist } from "../functions/singleProductDisplay"

const ProductCard = ({ product, deleteProductClick, isHome = false, isWishlist = false, setWishListChanged }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const [tooltip, setTooltip] = useState("Click to add")
    const { user } = useSelector(state => ({ ...state }))

    useEffect(() => {
        if (product.quantity <= 0)
            setTooltip("Out of stock!")

    }, [product.quantity])
    return (
        <div className={`aspect-auto 
        w-[100%] 
        xxs:w-[90%]
        xs:w-[100%] 
        sm:w-[100%]
        md:w-[100%]
        lg:w-[100%] rounded-lg bg-[#020327d2] space-y-2
        relative `
        }>
            <img src={product.images && product.images.length !== 0 ? product.images[0].url : "/img/default.webp"} className="w-full aspect-[16/12] object-cover object-center rounded-t-lg " alt="" />
            {isWishlist && <span className="absolute !py-0 !my-0 top-0 right-0 cursor-pointer hover:text-slate-800 text-white bg-transparent  rounded-full" onClick={() => {
                removeFromWishlist(product?._id, user)
                setWishListChanged(true)
            }}>
                < TiDelete className=" w-8 h-8" />
            </span>}
            <div className=" sm:h-[50px] sm:leading-6 md:leading-7 flex items-baseline h-[60px] mt-2 bg-slate-600 relative justify-center"><h1 className="text-white absolute px-1 top-[50%] -translate-y-[50%] text-sm md:text-lg font-mono font-extrabold md:leading-4  ">{product.brand.toUpperCase()}-{product.title}</h1></div>
            <h1 className="text-white text-[11px]  md:text-sm !leading-3 font-mono ">Rs {product.price}/-</h1>
            <div className="w-full pt-4 bg-white  flex flex-col justify-center items-center  ">
                <div className="flex sm:flex-row flex-col justify-center items-center">

                    <StarRatings
                        rating={product.ratingsQuantity === 0 ? 0 : product.ratingsAverage}
                        starRatedColor="#ee6c4d"
                        // changeRating={(val) => setRating(val)}
                        numberOfStars={5}
                        name='rating'
                        isSelectable='false'
                        starSpacing="1px"
                        starDimension='24px'
                    /><span className="text-base ml-1 text-slate-600 leading-6">({product.ratingsQuantity})</span>
                </div>
                <span className='font-montserrat mt-1 sm:text-sm text-xs'>
                    {product.ratingsQuantity === 0 ? "Not Rated Yet" : `Average Rating(${product.ratingsAverage})`}
                </span>
            </div>
            <div className="px-2 text-left h-[100px]  overflow-ellipsis overflow-y-scroll scrollhost text-white leading-3  text-xs">{product.description.substring(0, 120)}</div>
            <div className="absolute bottom-10 w-full">
                {product.quantity <= 0 &&
                    <h1 className="text-white bg-slate-400 px-1 text-sm">Currently out of stock !</h1>}
            </div>
            <div className=" ">
                {
                    isHome ? <div className="w-full text-lg  flex">
                        <Tooltip title="Click to View">
                            <div
                                className="cursor-pointer bg-white
                        hover:bg-tertiary hover:text-white text-tertiary
                        rounded-bl-md py-2 border-[#020327d2] text-xl
                        w-[50%] border-r-[1px]"
                                onClick={() => navigate(`/product/${product.slug}`)}
                            >
                                <EyeOutlined />
                            </div>
                        </Tooltip>
                        <Tooltip title={tooltip}>
                            <div
                                className={`${product.quantity <= 0 ? "" : "cursor-pointer hover:bg-red-500 hover:text-white"}  bg-white   ml-auto text-red-500 rounded-br-md border-[#020327d2] border-l-0 w-[50%] py-2 !text-2xl  flex items-center justify-center`}
                                onClick={() => { product.quantity > 0 && handleAddToCart(product, dispatch, { ...cart }) }}
                            ><BsCartPlus />
                            </div>
                        </Tooltip>
                    </div>
                        : <div className="w-full  text-lg  flex">
                            <div
                                className="cursor-pointer bg-slate-600
                    hover:bg-light text-tertiary 
                    rounded-bl-lg py-1 sm:py-2 border-[#020327d2]
                    w-[50%] border-r-[1px]"
                                onClick={() => {
                                    navigate(`/admin/product/update/${product.slug}`)
                                }}
                            >
                                <EditFilled />
                            </div>
                            <div
                                className="cursor-pointer bg-slate-600
                     hover:bg-light ml-auto text-red-500 
                    rounded-br-lg border-[#020327d2]
                     border-l-0 w-[50%] py-1 sm:py-2 "
                                onClick={() => deleteProductClick(product.slug)}
                            ><DeleteFilled /></div>
                        </div>
                }
            </div>
        </div>
    )
}

export default ProductCard
