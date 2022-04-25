import { Pagination } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import LoadingCard from "../components/LoadingCard"
import ProductCard from "../components/ProductCard"
import { getProductsByQuery } from "../functions/product"
const HomeSection = ({ heading, sort, headingBackground }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [pageNo, setPageNo] = useState(1)
    const [total, setTotal] = useState(0)
    const perPage = 12

    const getProductCount = async () => {

        const res = await axios.get(`${process.env.REACT_APP_API}/products/getCount/`)
        return res.data.total

    }
    const fetchProducts = async (page) => {
        return await getProductsByQuery({ sort, perPage, page })
    }
    useEffect(() => {
        let cancel = false
        fetchProducts(pageNo).then((res) => {
            if (cancel) return
            setProducts(res.data.data.products)
            setLoading(false)
        }).catch((err) => {
            if (cancel) return
            console.log(err.response.data.message)
            setLoading(false)
        })
        return () => { cancel = true }
    }, [pageNo])
    useEffect(() => {
        let cancel = false
        getProductCount().then(res => {
            if (cancel) return
            setTotal(res)
        })
        return () => {
            cancel = true
        }
    }, [])
    return (
        <div className={`w-full relative h-full  flex flex-col  space-y-1 overflow-hidden bg-opacity-60 pb-8 pt-0 text-center `}>

            <div className={`home-heading-container ${headingBackground}`}>
                <h2 className={` glow2 text-4xl`}>{heading}</h2>
            </div>
            <div className="grid scrollhost   px-2  overflow-hidden overflow-y-scroll
                                grid-cols-1
                                xs:grid-cols-2  xs:gap-x-3
                                sm:grid-cols-2 sm:gap-x-4
                                md:grid-cols-3
                                lg:grid-cols-3 lg:px-12 lg:gap-x-8
                                xl:grid-cols-4 xl:px-2 xl:gap-x-4 rounded-lg gap-y-4 py-8 justify-items-center items-center">
                {
                    loading ?
                        Array.from({ length: perPage }, (v, i) => i).map((_, i) => <LoadingCard key={i} />)

                        : products && products.map((product) => <ProductCard key={product._id} product={product} isHome={true} />)
                }
            </div>
            {total > 0 && <Pagination current={pageNo} total={Math.ceil(total / perPage) * 10} onChange={val => setPageNo(val)} />}

        </div>

    )
}

export default HomeSection
