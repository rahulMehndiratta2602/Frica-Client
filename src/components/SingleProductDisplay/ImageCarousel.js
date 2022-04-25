import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader


const ImageCarousel = ({ product }) => {
    return (
        <div className="relative w-full lg:col-span-4 bg-slate-700 px-4 bg-opacity-80">
            <Carousel
                autoPlay={true}
                useKeyboardArrows={true}
                autoFocus={true} interval={6000}
                autoPlay={true}
                infiniteLoop={true}
                emulateTouch={true}
                statusFormatter={(item, total) => ""}
            >
                {product?.images.length > 0 ? product?.images.map((image) => {
                    return <img
                        className='w-full md:aspect-[1.5] lg:aspect-[1.4]  xl:aspect-[1.65] items-center object-contain'
                        src={image.url} key={image.public_id} />
                }) :
                    <img
                        className='w-full md:aspect-[1.5] lg:aspect-[1.45] xl:aspect-[1.6] object-contain'
                        src='/img/default.webp' />}
            </Carousel>
        </div>
    )
}

export default ImageCarousel
