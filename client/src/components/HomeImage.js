import { useEffect, useState } from "react"
import axios from 'axios'
import Typewriter from 'typewriter-effect'
const aspectRatio = {
    "landscape": 1.5,
    "portrait": 0.8,
    "squarish": 1
}
const perPage = 30

function HomeImage() {
    const [imageArray, setImageArray] = useState([])
    const [width, setWidth] = useState(window.innerWidth)
    const [page, setPage] = useState(Math.floor(Math.random() * 31))
    const [activeImageIndex, setActiveImageIndex] = useState(0)
    const [prevImageIndexes, setPrevImageIndexes] = useState(Array.from({ length: perPage - 2 }, (v, i) => i + 2))
    const [nextImageIndex, setNextImageIndex] = useState(1)



    const getImages = async (orientation, pageNo = undefined) => {
        return await axios({
            method: 'get',
            url: `https://api.unsplash.com/search/photos?orientation=${orientation}&query=shopping&content_filter=low&per_page=30&page=${pageNo ? pageNo : page}`,
            headers: {
                'Accept-Version': 'v1',
                'Authorization': `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
            }
        })
    }

    useEffect(() => {
        setPage(Math.floor(Math.random() * 30))
        let timeOutFunctionId = null
        const resize = () => {
            clearTimeout(timeOutFunctionId)
            timeOutFunctionId = setTimeout(() => setWidth(window.innerWidth), 500)
        }
        window.addEventListener('resize', resize)
        return () => window.removeEventListener('resize', resize)
    }, [])
    useEffect(() => {
        setImageArray([])
        if (width <= 320) {
            setPage(Math.floor(Math.random() * 30))
            let cancel = false
            getImages('portrait').then(res => {
                if (cancel) return
                let images = []
                // console.log(res.data)
                res.data.results.map(result => {
                    images.push(result.urls.small)
                })
                setImageArray(images)
            }).catch(err => console.log(err.response.data))
            return () => {
                cancel = true
            }
        }
        else if (width < 600 && width > 320) {
            let cancel = false
            setPage(Math.floor(Math.random() * 30))
            getImages('squarish', 1).then(res => {
                if (cancel) return
                let images = []
                // console.log(res.data)
                res.data.results.map(result => {
                    images.push(result.urls.regular)
                })
                setImageArray(images)
            }).catch(err => console.log(err.response.data))
            return () => {
                cancel = true
            }
        }
        else {
            let cancel = false
            getImages('landscape').then(res => {
                if (cancel) return
                let images = []
                res.data.results.map(result => {
                    // console.log(images, images.length)
                    images.push(result.urls.regular)
                })
                setImageArray(images)
            })
                .catch(err => console.log(err.response.data))
            return () => {
                cancel = true
            }
        }

    }, [width])




    useEffect(() => {
        const imageInterval = setInterval(() => {
            const prevIndexes = [...prevImageIndexes]
            const prev = prevIndexes.shift()
            prevIndexes.push(activeImageIndex)
            setPrevImageIndexes(prevIndexes)
            setActiveImageIndex(nextImageIndex)
            setNextImageIndex(prev)
        }, 8000)
        return () => clearInterval(imageInterval)
    }, [prevImageIndexes, nextImageIndex, activeImageIndex])

    return (
        <div className="relative w-[100%] xl:aspect-[2.4]
        lg:aspect-[1.8]
        md:aspect-[1.5]
        sm:aspect-[1.3]
        xs:aspect-[1.2]
        xxs:aspect-[0.8]
        aspect-[0.8]
        text-white text-center
        select-none"
        >
            {imageArray && imageArray.length === perPage && <div className="w-full aspect-[inherit] relative ">
                < div className={`w-full aspect-[inherit] relative  overflow-hidden `}>
                    {

                        imageArray.map((src, i) => {
                            return <img src={src} className={`w-full aspect-[inherit] object-cover object-center select-none  ease-linear absolute top-0 left-0
                            ${i === activeImageIndex && " opacity-100 transition-transform duration-1000"}
                        ${prevImageIndexes.includes(i) && " -translate-x-[100%] transition-transform duration-1000 "}
                        ${i === nextImageIndex && " translate-x-[100%]  transition-none"}`}
                                alt="active-image" key={i} />

                        })

                    }
                </div>
            </div>
            }
            {

                <div className="
                w-full aspect-[inherit]
                absolute
                bg-black
                bg-opacity-70
                text-lightest
                top-0
                flex items-center justify-center
                text-center
                 font-bold uppercase text-xl md:text-4xl font-montserrat
                select-none
                "
                >
                    <Typewriter
                        options={{
                            strings: ['New Arrivals',
                                'Best Sellers',
                                'Lowest Price Guaranteed',
                                'A fresh approach to shopping',
                                'Discover something new',],
                            autoStart: true,
                            loop: true,
                            skipAddStyles: true,
                            delay: 50,
                            pauseFor: 5000,
                            deleteSpeed: 40,
                        }}


                    />

                </div>
            }
        </div >
    )
}

export default HomeImage
