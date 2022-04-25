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
        <div className="w-full flex items-center justify-center xxs:py-[112px] py-[128px] bg-slate-800 bg-opacity-80">
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
                    className="form-submit disabled:opacity-60"
                    disabled={!email}
                >
                    {loading ? "Loading..." : "Reset Password"}</button>
            </form>
        </div>
    )
}

export default ForgotPassword
