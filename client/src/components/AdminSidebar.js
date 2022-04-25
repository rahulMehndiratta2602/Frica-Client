import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

const AdminSidebar = () => {
    const location = useLocation()
    const [active, setActive] = useState("")
    useEffect(() => {
        if (location.pathname.startsWith('/admin'))
            setActive(location.pathname.replace('/admin/', ''))
    }, [location.pathname])
    const items = ['Dashboard', 'Categories', 'SubCategories', 'Products', 'Product', 'Coupons']
    return (
        <aside className="grid  xxs:grid-cols-3 grid-cols-2 border-t-4 border-light sm:flex sm:flex-col bg-secondary h-max sm:h-[84vh] sm:w-[10em] sm:space-y-8  sm:pt-10 text-center">
            {items.map((item, i) => (
                <Link to={item.toLowerCase()} key={i} className={`text-sm sm:text-base text-lightest focus:text-primary ${active === item.toLowerCase() && "text-primary"}`} onClick={() => setActive(item)}>{item}</Link>
            ))}
        </aside>
    )
}

export default AdminSidebar
