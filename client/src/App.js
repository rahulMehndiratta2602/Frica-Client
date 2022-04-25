import React, { Suspense } from 'react'
import {
  Routes,
  Route,
} from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { auth } from "./pages/auth/firebase"
import { getCurrentUser } from "./functions/auth"

import 'react-toastify/dist/ReactToastify.css'
import Loading from './components/Loading'

const ToastContainer = React.lazy(() => import("react-toastify").then(module => ({ default: module.ToastContainer })))
const Login = React.lazy(() => import("./pages/auth/Login"))
const Register = React.lazy(() => import("./pages/auth/Register"))
const Home = React.lazy(() => import("./pages/Home"))
const Nav = React.lazy(() => import("./components/Nav"))
const RegisterComplete = React.lazy(() => import("./pages/auth/RegisterComplete"))

const ForgotPassword = React.lazy(() => import("./pages/auth/ForgotPassword"))
const CreateProduct = React.lazy(() => import("./pages/Admin/product/CreateProduct"))
const UpdateProduct = React.lazy(() => import("./pages/Admin/product/UpdateProduct"))
const SingleProductDisplay = React.lazy(() => import("./pages/SingleProductDisplay"))
const Shop = React.lazy(() => import("./pages/Shop"))
const Cart = React.lazy(() => import("./pages/Cart"))
const Checkout = React.lazy(() => import("./pages/Checkout"))
const PaymentSuccess = React.lazy(() => import("./pages/PaymentSuccess"))
const PaymentCancel = React.lazy(() => import("./pages/PaymentCancel"))
const Footer = React.lazy(() => import("./components/Footer"))
const UserRoute = React.lazy(() => import("./pages/User"))
const AdminRoute = React.lazy(() => import("./pages/Admin"))
const Orders = React.lazy(() => import("./pages/User/Orders"))
const Password = React.lazy(() => import("./pages/User/Password"))
const Wishlist = React.lazy(() => import("./pages/User/Wishlist"))
const Dashboard = React.lazy(() => import("./pages/Admin/Dashboard"))
const SubCategories = React.lazy(() => import("./pages/Admin/SubCategory"))
const Products = React.lazy(() => import("./pages/Admin/product"))
const Categories = React.lazy(() => import("./pages/Admin/Category"))
const Coupon = React.lazy(() => import("./pages/Admin/coupon"))


// { Orders, Password, Wishlist }
// , { Dashboard, SubCategories, Products, Categories, Coupon }
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()
        getCurrentUser(idTokenResult.token).then(res => {
          dispatch(
            {
              type: "LOGGED_IN_USER",
              payload: {
                email: res.data.user.email,
                token: idTokenResult.token,
                name: res.data.user.name,
                _id: res.data.user._id,
                picture: res.data.user.picture,
                role: res.data.user.role,
                address: res.data.user.address
              }
            })
        }

        ).catch(err => console.log(err))

      }
    })
    return () => unsubscribe()
  }, [dispatch])


  return (
    <Suspense fallback={<div className="flex  justify-center items-center h-screen w-screen"><Loading number={6} /></div>}>
      <Nav />
      <ToastContainer autoClose={1000} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />

        <Route path='/login' element={<Login />} />
        <Route path='/payments/success' element={<PaymentSuccess />} />

        <Route path='/payments/cancel' element={<PaymentCancel />} />
        <Route path='/register' element={<Register />} />
        <Route path='/register/complete' element={<RegisterComplete />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />

        <Route path='/user' element={<UserRoute />}>
          <Route path="Orders" element={<Orders />} />
          <Route path="password" element={<Password />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Route>
        <Route path="/product/:slug" element={<SingleProductDisplay />} />

        <Route path='/admin' element={<AdminRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="coupons" element={<Coupon />} />
          <Route path="categories" element={<Categories />} />
          <Route path="subcategories" element={<SubCategories />} />
          <Route path="products" element={<Products />} />
          <Route path="product" element={<CreateProduct />} />
          <Route path="product/update/:slug" element={<UpdateProduct />} />
        </Route>
      </Routes>
      <Footer />
    </Suspense>)
}

export default App
