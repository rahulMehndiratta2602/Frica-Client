import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router"
import AdminSidebar from "../../components/AdminSidebar"
import { currentAdmin } from "../../functions/auth"
import Dashboard from "./Dashboard"
import Loading from '../../components/Loading'
import Categories from './Category'
import Products from './product'
import Coupon from './coupon'
import SubCategories from './SubCategory'

const AdminRoute = () => {
    const [ok, setOk] = useState(false)
    const [timer, setTimer] = useState(5)
    const [loading, setLoading] = useState(true)
    const { user } = useSelector(state => ({ ...state }))
    const navigate = useNavigate()
    useEffect(() => {
        if (user && user.token) {
            currentAdmin(user.token).then((res) => {
                // console.log("ADMIN RESOURCE ACCESSED", res)
                setOk(true)
            })
                .catch((err) => {
                    // console.log("ADMIN RESOURCE ERROR", err)
                    navigate('/')
                })
        }
        else
            navigate('/')
        setLoading(false)
    }, [user, navigate])
    return (
        <>
            {
                loading ?

                    <div className="flex  justify-center items-center h-[82vh]"><Loading number={6} /></div>

                    : <div className="flex flex-col sm:flex-row">
                        <AdminSidebar />
                        <div className="w-full sm:h-[84vh] xxs:h-[80vh] h-[77vh]   flex justify-center items-center bg-slate-800 bg-opacity-80">
                            {
                                ok
                                    ? <Outlet />
                                    : <div className="text-red-600">Admin Resource. Access Denied. </div>
                            }
                        </div>
                    </div>
            }
        </>
    )
}

export default AdminRoute
export { Dashboard, Categories, Coupon, Products, SubCategories }
