import { reauthenticateWithCredential } from "@firebase/auth"
import { useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { auth } from "../auth/firebase"
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const Password = () => {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("")
    const userEmail = useSelector(state => state.user.email)
    const [loading, setLoading] = useState(false)
    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        const user = auth.currentUser

        // TODO(you): prompt the user to re-provide their sign-in credentials
        const credential = firebase.auth.EmailAuthProvider.credential(
            userEmail,
            oldPassword
        )

        reauthenticateWithCredential(user, credential).then(async () => {
            await auth.currentUser.updatePassword(newPassword)
                .then(() => {
                    setLoading(false)
                    toast.success("Password Updated Successfully")
                    setOldPassword("")
                    setNewPassword("")
                    setNewPasswordConfirm("")
                }
                )
                .catch(err => {
                    setLoading(false)
                    toast.error(err.message)
                })
        }).catch((err) => {
            toast.error("Please enter correct old password and try again")
            setOldPassword("")
            setNewPassword("")
            setNewPasswordConfirm("")
            setLoading(false)

        })

    }

    return (
        <form
            className="w-full flex-shrink sm:w-[500px]  bg-primary flex flex-col items-center px-4 xxs:px-12 pb-20 pt-10 border-light xxs:border-[12px] rounded-md space-y-6"
            onSubmit={handleSubmit}
        >
            <img src="/img/logo2.png" className="w-[70px]" alt="" />

            <h1
                className="font-extrabold text-xl text-lightest"
            >
                Update Password
            </h1>
            <input
                type="password"
                placeholder="Enter your old password"
                className="text-center py-[1px] text-sm rounded-lg w-[90%] focus:ring-secondary focus:outline-none"
                onChange={(e) => setOldPassword(e.target.value)}
                value={oldPassword}
            />
            <input
                type="password"
                placeholder="Enter your new password"
                className="text-center py-[1px] text-sm rounded-lg w-[90%] focus:ring-secondary focus:outline-none"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
            />
            <input
                type="password"
                placeholder="Confirm your new password"
                className="text-center py-[1px] text-sm rounded-lg w-[90%] focus:ring-secondary focus:outline-none"
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
                value={newPasswordConfirm}
            />
            <button
                type="submit"
                className="bg-secondary px-4 py-2 text-xs xxs:text-lg rounded-full hover:opacity-90 text-white hover:text-white border-b-2 border-r-[1px] border-light  hover:border-r-2 hover:translate-x-[-1px] hover:translate-y-[-2px] focus:outline-none focus:ring-1 focus:ring-lightest disabled:opacity-60"
                disabled={!oldPassword || !newPassword || !newPasswordConfirm || newPassword.length < 8 || newPassword !== newPasswordConfirm || loading}
            >
                {loading ? "Loading..." : "Update Password"}</button>
        </form>
    )
}

export default Password
