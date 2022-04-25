import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai'
const Footer = () => {
    return (
        <div className="bg-slate-700 text-white font-montserrat flex justify-between px-8 py-2">
            &#169; Rahul Mehndiratta
            <div className="flex space-x-3 items-center">
                <a href="https://www.linkedin.com/in/rahul-mehndiratta-844606187/" className="text-white"><AiFillLinkedin className="text-xl" /></a>
                <a href="https://github.com/rahulMehndiratta2602" className="text-white"><AiFillGithub className="text-xl" /></a>
            </div>
        </div>
    )
}

export default Footer
