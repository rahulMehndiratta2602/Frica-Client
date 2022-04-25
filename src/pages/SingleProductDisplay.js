import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { getProduct } from "../functions/product"
import RatingModal from "../components/RatingModal"
import CartPopup from "../components/CartPopup"
import Footer from "../components/SingleProductDisplay/Footer"
import RelatedProducts from "../components/SingleProductDisplay/RelatedProducts"
import ImageCarousel from "../components/SingleProductDisplay/ImageCarousel"
import ProductInfo from "../components/SingleProductDisplay/ProductInfo"
import { getReview, getRelated } from "../functions/singleProductDisplay"

const SingleProductDisplay = () => {
    const params = useParams()
    const { user } = useSelector(state => ({ ...state }))
    const [product, setProduct] = useState(null)
    const [review, setReview] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [reviewSubmitted, setReviewSubmitted] = useState(false)
    const [related, setRelated] = useState([])


    useEffect(() => {
        getProduct(params.slug, true)
            .then(res => {
                const { product } = res.data
                setProduct(product)
                getRelated(product._id).then(res => setRelated(res.data.products))
                // console.log(product)
            }).catch(err => {
                console.log(err)
            })
    }, [reviewSubmitted])
    useEffect(() => {
        if (product && user) {
            getReview(product._id, setReview, user.token)
        }
    }, [product, user])
    return (<>
        {showModal && <RatingModal setShowModal={setShowModal} product={product} setReviewSubmitted={setReviewSubmitted} review={review} />}
        <CartPopup />
        <div className="w-full bg-slate-700 bg-opacity-80 pt-10">
            {/* {JSON.stringify(product)} */}

            <div className=" grid grid-cols-1 lg:grid-cols-7 gap-y-8">
                <ImageCarousel product={product} />
                <ProductInfo product={product} setShowModal={setShowModal} review={review} />
                <Footer product={product} />
            </div>
            <RelatedProducts related={related} />
        </div >
    </>

    )
}

export default SingleProductDisplay
