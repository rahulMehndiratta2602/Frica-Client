import Search from "../../../components/Search"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { deleteProduct, getProductsByQuery } from "../../../functions/product"
import ProductCard from "../../../components/ProductCard"

const Products = () => {
    const [products, setProducts] = useState([])
    const user = useSelector(state => state.user)
    const fetchProducts = async () => {
        try {
            const res = await getProductsByQuery({ sort: '-createdAt', perPage: 100 })
            setProducts(res.data.data.products)
            // console.log(res.data.data.products)
        }
        catch (err) {
            console.log(err)
        }
    }
    const deleteProductClick = async (slug) => {
        if (window.confirm(`Are you sure?`))
            try {
                console.log(slug)
                await deleteProduct(user.token, slug)
                fetchProducts()
            } catch (err) {
                console.log(err.response.data)
            }
    }
    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <div className="w-full relative h-full bg-primary flex flex-col px-2 sm:px-4 pt-3 pb-3 border-light sm:border-[4px]  space-y-1 overflow-hidden text-center">

            <h1 className="text-lg text-lightest font-bold">All Products</h1>
            {/* {JSON.stringify(products)} */}
            <div className="grid scrollhost  bg-white overflow-hidden overflow-y-scroll
            px-0 grid-cols-1
            xxs:px-2
            xs:grid-cols-2 xs:px-4 xs:gap-x-3
            sm:grid-cols-2 sm:gap-x-4
            md:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4  rounded-md gap-y-4 py-8 justify-items-center items-center">{products && products.map((product) => <ProductCard key={product._id} product={product} deleteProductClick={deleteProductClick} />)}
            </div>
        </div>
    )
}

export default Products
