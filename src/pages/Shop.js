import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import CartPopup from "../components/CartPopup"
import ProductCard from "../components/ProductCard"
import ShopSideNav from '../components/ShopSideNav'
import { getFilteredProducts } from "../functions/product"
const Shop = () => {
    const { filter } = useSelector(state => ({ ...state }))
    const dispatch = useDispatch()
    const { showFilter } = filter
    const [products, setProducts] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        const timeout = setTimeout(() => getFilteredProducts({ ...filter, categories: undefined, subCategories: undefined, showFilter: undefined, colors: undefined, brands: undefined }).then(
            res => setProducts(res.data.data.products)
        ).catch(err => console.log(err.response.data.message)), 1000)
        return () => clearTimeout(timeout)
    }, [filter])

    //Just for show
    useEffect(() => {
        setSearchParams({ ...filter, brands: undefined, colors: undefined, subCategories: undefined })
    }, [filter])
    return (
        <div className={`flex lg:flex-row flex-col overflow-hidden pb-1 lg:pb-0 `}>
            < CartPopup />
            < div className={`${showFilter ? "lg:w-[25%]  h-[35vh] lg:h-[86vh] pb-2" : "lg:w-0 h-0 lg:h-[86vh] "}
            w-full relative
            transition-all ease-linear duration-150    bg-white  overflow-hidden overflow-y-scroll scrollhost`}><ShopSideNav filter={filter} /></div>
            {/* ${showFilter ? "lg:col-span-9 rounded-br-md col-span-12" : "col-span-12"} text-base text-white overflow-hidden overflow-y-scroll scrollhost lg:h-[88vh] h-[100vh] bg-primary */}
            <div className={`
            ${showFilter ? "lg:w-[75%]  h-full" : "lg:w-[100%]  h-full"}
            w-full relative
            lg:h-[86vh]
            transition-all ease-linear duration-150
            text-base text-white  overflow-hidden overflow-y-scroll scrollhost`}
            >
                <div className="w-full relative h-full bg-slate-900 bg-opacity-90 flex flex-col px-0  pb-3  text-center space-y-1 overflow-hidden ">

                    <h1 className="text-lg text-lightest font-bold bg-slate-700 text-left py-2 px-6 font-montserrat">{products.length > 0 ? `All Products (${products.length})` : "No Matching Products Found"}</h1>
                    <div className={`grid scrollhost h-full relative
                       overflow-hidden overflow-y-scroll
                        px-0 grid-cols-1
                        xxs:px-2
                        xs:grid-cols-2 xs:px-4 xs:gap-x-3
                        sm:grid-cols-2 sm:gap-x-4
                        md:grid-cols-3
                        ${showFilter ? "lg:grid-cols-3" : "lg:grid-cols-4"}
                        xl:grid-cols-4
                        gap-y-4 lg:py-8 py-2
                        justify-items-center items-center `}>
                        {products && products.map((product) => <ProductCard key={product._id} product={product} isHome={true} />)}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Shop
