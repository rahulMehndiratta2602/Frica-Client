import { WiDirectionLeft } from "react-icons/wi"
import { useNavigate } from "react-router"

const PaymentCancel = () => {
    const navigate = useNavigate()
    return (
        <div className="w-full flex flex-col items-center justify-center bg-white font-montserrat py-8 px-4">
            <h1 className="text-base xs:text-2xl font-semibold text-tertiary">Your order has been cancelled.</h1>

            <button className="bg-primary text-white flex items-center space-x-1 px-2 py-1 hover:bg-secondary rounded-sm"
                onClick={() => navigate('/cart')}
            >
                <WiDirectionLeft className="text-md xxs:text-lg" /><span className="text-xs xxs:text-sm">Back to Cart</span>
            </button>


        </div>
    )
}

export default PaymentCancel
