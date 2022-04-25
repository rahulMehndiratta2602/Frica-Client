import { useDispatch, useSelector } from "react-redux"
import StarRatings from "react-star-ratings"
import { BsCartPlus } from "react-icons/bs"
import { HeartFilled, HeartOutlined, StarOutlined } from "@ant-design/icons"
import { Tooltip } from "antd"
import { useNavigate, useParams } from "react-router"
import { handleSubCatClick, handleCatClick, handleRatingButtonClick, addToWishlist, removeFromWishlist } from '../../functions/singleProductDisplay'
import { handleAddToCart } from "../../functions/cart"
import { useEffect, useState } from "react"
import { getUserWishlist } from "../../functions/user"



const ProductInfo = ({ product, setShowModal, review }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const [wishlistAdded, setWishlistAdded] = useState(false)
    const [cartTooltip, setCartTooltip] = useState("Click to Add to Cart")
    const [wishListTooltip, setWishlistTooltip] = useState('Click to Add to Wishlist')
    const { user, cart, filter } = useSelector(state => ({ ...state }))


    useEffect(() => {
        if (product && product.quantity <= 0) {
            setCartTooltip('Out of Stock')
        }

    }, [product])
    useEffect(() => {
        if (user && user.token && product !== null) {
            getUserWishlist(user.token).then((res) => {
                if (res.data.wishList.length && res.data.wishList.find(item => item._id === product._id)) {
                    setWishlistAdded(true)
                    setWishlistTooltip('Click to Remove from Wishlist')
                }
            })
        }
    }, [user, product])
    const handleWishlist = () => {
        if (user && user.token) {
            if (wishlistAdded) {
                removeFromWishlist(product._id, user)
                setWishlistTooltip('Click to Add to Wishlist')
            }
            else {
                addToWishlist(product._id, user)
                setWishlistTooltip('Click to Remove from Wishlist')
            }
            setWishlistAdded(!wishlistAdded)
        }
        else {
            navigate(
                '/login',
                {
                    state: { from: `/product/${params.slug}` }
                }
            )
        }


    }

    return (
        <div className="relative w-full   lg:col-span-3  flex flex-col justify-start">

            <label className="w-full relative text-center py-2 font-montserrat tracking-[2px] bg-slate-800 bg-opacity-100 text-white sm:text-3xl text-lg font-[800] ">{product?.title}</label>
            <div className="w-full pt-4 bg-white  flex flex-col justify-center items-center  ">
                <div className="flex sm:flex-row flex-col justify-center items-center">

                    <StarRatings
                        rating={product?.ratingsQuantity === 0 ? 0 : product?.ratingsAverage}
                        starRatedColor="#ee6c4d"
                        // changeRating={(val) => setRating(val)}
                        numberOfStars={5}
                        name='rating'
                        isSelectable='false'
                        starSpacing="1px"
                        starDimension='24px'
                    /><span className="text-base ml-1 text-slate-600 leading-6">({product?.ratingsQuantity})</span>
                </div>
                <span className='font-montserrat mt-1 sm:text-sm text-xs'>
                    {product?.ratingsQuantity === 0 ? "Not Rated Yet" : `Average Rating(${product?.ratingsAverage})`}
                </span>
            </div>
            <div className="flex flex-col bg-white px-4 font-montserrat text-sm space-y-3 lg:space-y-4 py-6 text-gray-700">
                <div className="flex flex-row w-full ">
                    <h4 className="text-gray-600">Price</h4>
                    <h4 className="ml-auto font-mono text-gray-600">{product?.price}</h4>
                </div>
                <div className="flex flex-row w-full ">
                    <h4 className="text-gray-600">Category</h4>
                    <a className="ml-auto font-mono " onClick={() => handleCatClick(product?.category._id, dispatch, navigate, filter)}>{product?.category.name}</a>
                </div>
                <div className="flex flex-row w-full ">
                    <h4 className="text-gray-600">Sold</h4>
                    <h4 className="ml-auto font-mono text-gray-600">{product?.sold}</h4>
                </div>
                <div className="flex flex-row w-full ">
                    <h4 className="text-gray-600">Sub Categories</h4>
                    <div className="ml-auto w-[45%] text-right  break-normal ">
                        {
                            product?.subCategories.map(subcat => {
                                return (
                                    <a className="font-mono" key={subcat.slug} onClick={() => handleSubCatClick(product?.category._id, subcat._id, dispatch, navigate, filter)}>{`${subcat.name} `}</a>
                                )
                            })
                        }

                    </div>
                </div>
                <div className="flex flex-row w-full ">
                    <h4 className="text-gray-600">Shipping</h4>
                    <h4 className="ml-auto font-mono text-gray-600">{product?.shipping}</h4>
                </div>
                <div className="flex flex-row w-full ">
                    <h4 className="text-gray-600">Stock</h4>
                    <h4 className="ml-auto font-mono text-gray-600">{product?.quantity}</h4>
                </div>
                <div className="flex flex-row w-full ">
                    <h4 className="text-gray-600">Color</h4>
                    <h4 className="ml-auto font-mono text-gray-600">{product?.color}</h4>
                </div>
                <div className="flex flex-row w-full ">
                    <h4 className="text-gray-600">Brand</h4>
                    <h4 className="ml-auto font-mono text-gray-600">{product?.brand}</h4>
                </div>
            </div>
            <div className="flex">
                <Tooltip title={cartTooltip}>
                    <div className={`w-full flex flex-col text-center bg-white text-xl space-y-1 ${product?.quantity > 0 && "cursor-pointer"}
                                py-4 hover:bg-tertiary hover:text-white text-tertiary
                                justify-center items-center `} onClick={() => { product?.quantity > 0 && handleAddToCart({ ...product, reviews: undefined }, dispatch, { ...cart }) }}><BsCartPlus /><p className="text-gray-700 text-sm lg:text-xs">Add to Cart</p></div>
                </Tooltip>
                <Tooltip title={wishListTooltip}>
                    <div
                        className="w-full flex flex-col text-center bg-white text-xl space-y-1 cursor-pointer py-4 hover:bg-primary hover:text-white text-primary justify-center"
                        onClick={() => { handleWishlist() }}
                    >
                        {wishlistAdded ? <HeartFilled /> : <HeartOutlined />}
                        <p className="text-gray-700 text-sm lg:text-xs">{user && user.token ? (wishlistAdded ? "Added to Wishlist" : "Add to Wishlist") : "Login to Add to Wishlist"}</p></div>
                </Tooltip>
                <Tooltip title="Click to Add Review">
                    <div
                        className="w-full flex flex-col text-center bg-white text-xl space-y-1 cursor-pointer py-4 hover:bg-secondary hover:text-white  text-secondary justify-center "
                        onClick={() => handleRatingButtonClick(user, setShowModal, navigate, params)}
                    ><StarOutlined /><p className="text-gray-700 text-sm lg:text-xs">{user && user.token
                        ? (review !== null ? 'Update Review' : 'Rate this Product')
                        : 'Login to Leave Rating'}</p>
                    </div>
                </Tooltip>

            </div>
        </div>
    )
}

export default ProductInfo
