import { getAuth, signOut } from "firebase/auth"
import { Menu } from 'antd'
import { DashboardOutlined, LogoutOutlined, ShopFilled, UserAddOutlined, UserOutlined } from '@ant-design/icons'
import { FaUserCircle } from 'react-icons/fa'
import { BsFilterLeft } from 'react-icons/bs'
import { TiShoppingCart } from 'react-icons/ti'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
const { SubMenu, Item } = Menu


const Nav = () => {
    const [width, setWidth] = useState(window.innerWidth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, filter, cart } = useSelector(state => ({ ...state }))
    const [userMenuShow, setUserMenuShow] = useState(false)
    const location = useLocation()
    const [shop, setShop] = useState(false)
    const [cartPage, setCartPage] = useState(false)
    const [cartLength, setCartLength] = useState(cart.products?.length || 0)

    const logout = () => {
        const auth = getAuth()
        signOut(auth)
        dispatch({
            type: "LOGOUT",
            payload: null
        })
        navigate('/login')
    }
    const handleFilterClick = () => {
        dispatch({
            type: "TOGGLE_SHOW_FILTER",
            payload: {
                ...filter,
                showFilter: !filter.showFilter
            }
        })
    }
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])
    useEffect(() => {
        if (location.pathname === '/shop')
            setShop(true)
        else
            setShop(false)
        if (location.pathname === '/cart')
            setCartPage(true)
        else
            setCartPage(false)
    }, [location])
    useEffect(() => {
        setCartLength(cart.products?.length)
    }, [cart.products])

    return (
        <div className="bg-white relative  xxs:px-8 px-2 py-[10px]  border-b-secondary border-b-[4px]">
            {
                userMenuShow && <div className="flex absolute xxs:right-8 right-0 bg-[#3d5a80] text-white z-50 top-[88%] space-y-2 py-1 flex-col w-full xxs:w-[200px] px-2 font-montserrat text-sm rounded-sm">
                    <div className="w-0 h-0 border-x-[6px] border-x-transparent border-b-[6px] border-b-primary absolute bg-white -top-[6px] right-4 xxs:right-2"></div>
                    {(user && user.token) &&
                        <div
                            className='flex space-x-2 items-center px-1 py-1'>
                            <span>
                                {user.name}
                            </span>
                        </div>
                    }
                    {(user && user.token) &&
                        <Link
                            onClick={() => setUserMenuShow(false)}
                            to={user.role === 'admin' ? '/admin/dashboard' : '/user/orders'} className='nav-link'><DashboardOutlined />
                            <span>
                                Dashboard
                            </span>
                        </Link>
                    }
                    {(user && user.token) &&
                        <Link to='/' className='nav-link' onClick={() => {
                            logout()
                            setUserMenuShow(false)
                        }}><LogoutOutlined />
                            <span>
                                Logout
                            </span>
                        </Link>
                    }
                    {!user &&
                        <Link
                            onClick={() => setUserMenuShow(false)}
                            to='/login' className='nav-link'><UserOutlined />
                            <span>
                                Login
                            </span>
                        </Link>
                    }
                    {!user &&
                        <Link
                            onClick={() => setUserMenuShow(false)}
                            to='/register' className='nav-link'><UserAddOutlined />
                            <span>
                                SignUp
                            </span>
                        </Link>
                    }


                </div>
            }
            <ul className="flex justify-start py-0 items-center m-0 relative">
                {!shop && <li><Link
                    to="/"
                    className="text-[18px] font-bold "
                >
                    <img
                        src={`${width < 768 ? "/img/logo2.png" : "/img/logo.png"}`}
                        className="h-11 w-auto md:h-11 md:w-auto"
                        alt="Logo"

                    />
                </Link></li>}
                {!shop && <li>
                    <Link to='/shop' className='text-primary hover:text-secondary active:text-secondary cursor-pointer absolute left-[50%] top-[50%]  xxs:translate-x-[-50%] translate-y-[-50%] text-3xl'>
                        <ShopFilled
                        />
                    </Link>
                </li>}
                <li >
                    <FaUserCircle className={` hover:text-secondary cursor-pointer absolute right-0 top-[50%] translate-y-[-50%] text-3xl justify-center ${!userMenuShow ? 'text-primary' : 'text-secondary'}`}
                        onClick={() => setUserMenuShow(!userMenuShow)} />
                </li>
                <li>
                    {!cartPage && <Link to="/cart" className=" absolute right-12 top-[50%] translate-y-[-50%] hover:text-secondary  text-[#3875fc]  justify-center cursor-pointer">

                        <TiShoppingCart className="  text-3xl" />
                        <div className="absolute -top-[6px] -right-[6px] bg-red-500 text-white w-[18px] h-[18px] rounded-full flex justify-center items-center text-xs">{cartLength}</div>
                    </Link>}

                </li>
                {shop &&
                    <li>
                        <BsFilterLeft className={`${filter.showFilter ? "text-secondary hover:text-primary" : "text-primary hover:text-secondary"}  cursor-pointer text-3xl`} onClick={handleFilterClick} />
                    </li>
                }
                {shop && <li><Link
                    to="/"
                    className="text-[18px] font-bold absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]"
                >
                    <img
                        src="/img/logo2.png"
                        className="h-11 w-auto  "
                        alt="Logo"

                    />
                </Link></li>}

            </ul>
        </div>
    )
}

export default Nav