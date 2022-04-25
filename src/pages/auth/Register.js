import { useState, useEffect } from "react"
import { auth } from './firebase'
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"

const Register = () => {

    const [email, setEmail] = useState("")
    const { user } = useSelector(state => state)
    const navigate = useNavigate()
    useEffect(() => {
        if (user && user.token)
            navigate('/')
    }, [user, navigate])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(process.env.REACT_APP_REGISTER_REDIRECT_URL)
            console.log(process.env.REACT_APP_PASSWORD_RESET_REDIRECT_URL)
            console.log(process.env.URL)
            const config = {
                url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
                handleCodeInApp: true
            }
            await auth.sendSignInLinkToEmail(email, config)
            toast.success(`Email is sent to ${email}.Click the link to complete registration`)
            window.localStorage.setItem('registration_email', email)
        }
        catch (err) {
            toast.error(err.message)
        }
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
                    Register
            </h1>


                <input
                    type="email"
                    autoFocus
                    placeholder="name@example.com"
                    className="text-center focus rounded-lg xxs:w-[90%] w-full focus:ring-secondary focus:outline-none"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="form-submit">Submit</button>
            </form>
        </div>

    )
}

export default Register
