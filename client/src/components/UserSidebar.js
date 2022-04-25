import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

const UserSidebar = () => {
    const location = useLocation()
    const [active, setActive] = useState("")
    useEffect(() => {
        if (location.pathname.startsWith('/user'))
            setActive(location.pathname.replace('/user/', ''))
    }, [location.pathname])
    const items = ['Orders', 'Password', 'Wishlist']
    return (
        <aside className="flex flex-shrink-0 flex-row space-x-4 py-2 font-medium justify-center sm:space-x-0 sm:justify-start sm:flex-col bg-primary sm:h-[84.3vh] sm:w-[10em] sm:space-y-8  sm:pt-10 text-center">
            {items.map((item, i) => (
                <Link to={item.toLowerCase()} key={i} className={`text-sm xxs:text-lg text-white hover:text-secondary focus:text-secondary ${active === item.toLowerCase() && "text-secondary"}`} onClick={() => setActive(item)}>{item}</Link>
            ))}
        </aside>
    )
}

export default UserSidebar
