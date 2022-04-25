import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ProductCard from "../../components/ProductCard"
import { getUserWishlist } from "../../functions/user"

const Wishlist = () => {
    const { user } = useSelector(state => ({ ...state }))
    const [wishlist, setWishlist] = useState([])
    const [wishListChanged, setWishListChanged] = useState(false)
    useEffect(() => {
        if (user && user.token) {
            getUserWishlist(user.token).then((res) => {
                setWishlist(res.data.wishList)
            })
            setWishListChanged(false)
        }
    }, [user, wishListChanged])
    return (
        <div className="w-full relative h-full  flex flex-col px-0 space-y-0 text-center overflow-hidden bg-transparent">

            <h1 className="text-lg text-lightest font-bold bg-secondary text-left py-2 px-6 mb-0 ">{wishlist?.length > 0 ? `All Items (${wishlist?.length})` : "Your Wishlist is Empty"}</h1>
            <div className={`grid scrollhost h-full relative
                       overflow-hidden overflow-y-scroll
                        px-0 grid-cols-1
                        xxs:px-2
                        xs:grid-cols-2 xs:px-4 xs:gap-x-3
                        sm:grid-cols-2 sm:gap-x-4
                        md:grid-cols-3
                        "lg:grid-cols-4"
                        xl:grid-cols-4
                        gap-y-4 lg:py-8 py-4
                        justify-items-center items-center bg-transparent`}>
                {wishlist && wishlist.map((product) => <ProductCard key={product._id} product={product} isHome={true} isWishlist={true} setWishListChanged={setWishListChanged} />)}
            </div>
        </div>
    )
}

export default Wishlist
