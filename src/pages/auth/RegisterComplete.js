import { useEffect, useState } from "react"
import { auth } from './firebase'
import { toast } from "react-toastify"
import { createOrUpdateUser } from "../../functions/auth"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"

const RegisterComplete = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        setEmail(window.localStorage.getItem('registration_email'))
        // console.log(window.location.href)
        // console.log(location.protocol)

    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault()

        // validation
        if (!email || !password) {
            toast.error('Email and Password are required')
            return
        }
        if (password.length < 8) {
            toast.error('Password must be at least 8 characters long')
            return
        }
        try {
            // console.log(location)
            const result = await auth.signInWithEmailLink(
                email,
                window.location.href
            )
            if (result.user.emailVerified) {
                // remove user's email from local storage
                window.localStorage.removeItem('registration_email')
                //get user id token
                let user = auth.currentUser
                console.log(auth)
                await user.updatePassword(password)
                const idTokenResult = await user.getIdTokenResult()
                console.log('user', user)
                console.log(idTokenResult)
                // reduxStore
                createOrUpdateUser(idTokenResult.token)
                    .then(res => {
                        toast.success('Logged in successfully!')
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                email: user.email,
                                token: idTokenResult.token,
                                name: user.name,
                                _id: user._id,
                                picture: user.picture
                            }
                        })
                        navigate('/')
                    })
                    .catch(err => console.log(err))


            }
        } catch (err) {
            console.log(err)
            toast.error(err.message)
        }
    }
    return (
        <div className="w-full flex items-center justify-center xxs:py-[81px]  py-[92px] bg-slate-800 bg-opacity-80">

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
                    placeholder="name@example.com"
                    className="text-center focus rounded-lg w-[90%] focus:ring-secondary focus:outline-none"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    disabled
                />
                <input
                    type="password"
                    autoFocus
                    placeholder="Enter your password"
                    className="text-center focus rounded-lg w-[90%] focus:ring-secondary focus:outline-none"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button type="submit" className="bg-secondary px-4 py-2 text-sm xs:text-lg rounded-full hover:opacity-90 text-white hover:text-white border-b-2 border-r-[1px] border-light  hover:border-r-2 hover:translate-x-[-1px] hover:translate-y-[-2px] focus:outline-none focus:ring-1 focus:ring-lightest">Complete Registration</button>
            </form>
        </div>
    )
}

export default RegisterComplete
