import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router"
import Loading from "../../components/Loading"
import UserSidebar from "../../components/UserSidebar"
import Orders from "./Orders"
import Password from "./Password"
import Wishlist from "./Wishlist"

const UserRoute = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { user } = useSelector(state => ({ ...state }))
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    useEffect(() => {
        if (user && user.token) {
            setIsLoggedIn(true)
        }
        else {
            navigate('/login')
        }
        setLoading(false)
    }, [user, navigate])
    return (<>
        {
            loading
                ? <div className="flex justify-center items-center h-[78vh] w-full relative"><Loading /></div>
                : <div className="flex flex-col sm:flex-row  font-montserrat w-full relative">
                    <UserSidebar />
                    <div className="w-full relative h-[80vh] xxs:h-[77.8vh] sm:h-[84.3vh] flex justify-center items-center bg-slate-800 bg-opacity-80">
                        {
                            isLoggedIn
                                ? <Outlet />
                                : <div className="text-red-600">You need to be logged in to access this route.</div>
                        }
                    </div>
                </div>

        }</>
    )
}

export default UserRoute
export { Orders, Wishlist, Password }
