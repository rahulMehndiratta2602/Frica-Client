import ProductCard from "../ProductCard"

const RelatedProducts = ({ related }) => {
    return (
        <div className="w-full relative pb-8">
            <h1 className="text-white text-3xl font-montserrat text-center w-full relative bg-secondary">Related Products</h1>
            <div className="grid gap-[4px] xxs:gap-[4px] xxs:grid-cols-[repeat(auto-fit,_300px)] grid-cols-[minmax(220px,_1fr)]  grid-flow-col overflow-x-auto pt-8 md:scrollhost  xxs:auto-cols-[300px] auto-cols-[minmax(220px,_1fr)] text-center px-2 xxs:px-0  xxs:mx-8" >
                {related.length && related.map(product => < ProductCard product={product} isHome={true} key={product._id} />)
                }

            </div>
        </div>
    )
}

export default RelatedProducts
