import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import { auth } from "./firebase"

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(state => state)

    useEffect(() => {
        if (user && user.token)
            navigate('/')
    }, [user, navigate])
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const config = {
            url: process.env.REACT_APP_PASSWORD_RESET_REDIRECT_URL,
            handleCodeInApp: true
        }
        await auth.sendPasswordResetEmail(email, config).then(() => {
            setEmail("")
            setLoading(false)
            toast.success(`Password reset link sent to ${email}`)
        }).catch((err) => {
            setLoading(false)
            toast.error(err.message)
        })
    }
    return (
        <form
            className="form"
            onSubmit={handleSubmit}
        >
            <img src="/img/logo2.png" className="w-[70px]" alt="" />

            <h1
                className="font-extrabold text-xl text-lightest"
            >
                Forgot Password
            </h1>
            <input
                type="email"
                placeholder="Enter your email"
                className="text-center focus rounded-lg w-[90%] focus:ring-secondary focus:outline-none"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <button
                type="submit"
                className="bg-secondary px-4 py-2 text-lg rounded-full hover:opacity-90 text-white hover:text-white border-b-2 border-r-[1px] border-light  hover:border-r-2 hover:translate-x-[-1px] hover:translate-y-[-2px] focus:outline-none focus:ring-1 focus:ring-lightest disabled:opacity-60"
                disabled={!email}
            >
                {loading ? "Loading..." : "Reset Password"}</button>
        </form>
    )
}

export default ForgotPassword
