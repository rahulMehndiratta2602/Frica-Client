import { useEffect, useState } from "react"
import { MdClose } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"


const CartPopup = () => {
    const [scroll, setScroll] = useState(window.scrollY)
    const { cart, cartPopup } = useSelector(state => ({ ...state }))
    const [modalOpen, setModalOpen] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        const widthEvent = window.addEventListener('resize', () => {
            setScroll(window.scrollY)
        })
        return () => window.removeEventListener('resize', widthEvent)
    }, [])
    const closeModal = () => {

        dispatch({
            type: "HIDE_MODAL",
            payload: { show: false, title: "", itemPresent: false },
        })
        document.querySelector('body').classList.remove('modal-open')


    }
    useEffect(() => {
        setScroll(window.scrollY)
        const t = setTimeout(() => {
            setModalOpen(modalOpen => !modalOpen)
        }, 200)
        return () => {
            clearTimeout(t)
            setScroll(0)
        }
    }, [cartPopup])
    return (
        <>
            {cartPopup.show && <div className={`z-50 absolute left-0 w-[100vw] overflow-hidden h-screen bg-slate-900 ${!modalOpen ? "bg-opacity-80" : "bg-opacity-0"} flex justify-center items-center transition-opacity duration-300 ease-linear`
            }

                style={{ top: `${scroll}px` }}>
                <div className="absolute top-4 left-4 font-bold text-3xl cursor-pointer text-white " onClick={closeModal}><MdClose /> </div>
                <div className={`bg-white absolute
                w-screen h-[250px] bottom-0 
                xs:w-[300px] xs:h-screen  xs:right-0 
                 ${!modalOpen ? " xs:translate-x-0  opacity-100 " : " xs:translate-x-[100%] opacity-0 "}
                 transition-all ease-linear duration-300   font-montserrat text-center pt-2`}>
                    <h1 className={`text-sm xs:text-base font-semibold ${cartPopup.itemPresent ? "text-red-500" : "text-tertiary"}`}>
                        {
                            cartPopup.itemPresent
                                ? "Item already in cart"
                                : `${cartPopup.title} added to cart`
                        }
                    </h1>
                    <div className="w-full flex justify-between px-4 pb-4">
                        <span className="text-sm xs:text-lg font-semibold">Your Cart ({cart.products?.length})</span>
                        <button className="bg-tertiary text-white px-2 py-[1px] rounded-sm" onClick={() => {
                            closeModal()
                            navigate('/cart')
                        }}>Go to Cart</button>
                    </div>
                    <div className="flex  flex-col px-2 xs:py-4 py-2 xs:space-y-2 space-y-[2px] overflow-hidden xs:h-[90vh] h-[180px]   overflow-y-scroll scrollhost">
                        {
                            cart.products?.map((product) => (
                                <div key={product._id}>
                                    <img src={product.images[0].url} alt={product.title} className="hidden xs:block xs:w-full xs:aspect-[2] object-center object-cover" />
                                    <h1 className="bg-slate-800 text-xs text-white py-1 sm:py-0" >{product.title}</h1>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div >}
        </>
    )
}

export default CartPopup
