import Resizer from "react-image-file-resizer"
import axios from 'axios'
import { useSelector } from "react-redux"
import Loading from "./Loading"
import { toast } from "react-toastify"
const FileUpload = ({ values, setValues }) => {
    let { user } = useSelector(state => ({ ...state }))
    const fileUploadAndResize = (e) => {
        let files = e.target.files
        let allUploadedFiles = values.images
        let allUploadedFilesLength = allUploadedFiles.length
        if (files) {
            const length = Array.from(files).length
            for (let i = 0; i < length; i++) {
                allUploadedFiles.push({ loading: true })
            }
            setValues({ ...values, images: allUploadedFiles })

            Array.from(files).map((image, i) => {
                Resizer.imageFileResizer(image, 720, 720, 'JPEG', 100, 0, (uri) => {
                    axios.post(`${process.env.REACT_APP_API}/images/upload`, { image: uri }, { headers: { authToken: user && user.token } }).then(res => {
                        allUploadedFiles[allUploadedFilesLength + i] = { ...res.data, loading: false }

                        setValues({ ...values, images: allUploadedFiles })
                    }).catch(err => {
                        return console.log(err.response)
                    })
                }, "base64")
            })
        }
    }
    const handleCrossClick = (public_id) => {
        axios.post(`${process.env.REACT_APP_API}/images/remove`, { public_id }, { headers: { authToken: user && user.token } }).then(res => {
            const { images } = values
            let filteredImages = images.filter((item) => item.public_id !== public_id)
            setValues({ ...values, images: filteredImages })
            // toast.success("Image deleted")
        }).catch((err) => {
            console.log(err.response.data.message)
            toast.error(err.response.data.message)
        })
    }
    return (
        <div className="bg-lightest py-4 rounded-md sm:flex space-x-2 lg:px-6 px-2 block items-center">
            <div className="grid grid-cols-[repeat(3,_minmax(0,_50px))] justify-center gap-x-3 gap-y-2 sm:grid-cols-4 lg:grid-cols-7 mb-4 sm:mb-0 ">

                {values.images?.map((img, i) => {
                    return (img.loading ?
                        <div className="w-12 h-12 flex justify-center items-center " key={i}><Loading number={4} /></div>
                        :
                        <div key={img.public_id} className="relative">
                            <img src={img.url} className="w-12 h-12 inline-block " />
                            <div className="absolute cursor-pointer -right-1 -top-1 w-4 h-4 leading-[14px] text-xs bg-red-600 hover:opacity-90 text-center text-white rounded-full "
                                onClick={() => handleCrossClick(img.public_id)}
                            >x</div>
                        </div>)
                })}

            </div>

            <span className="!ml-auto">
                <div>
                    <label htmlFor="photo" className="btn-secondary">Choose Images</label>
                    <input type="file" hidden multiple accept='images/*' id="photo" onChange={fileUploadAndResize} />
                </div>
            </span>
        </div>

    )
}

export default FileUpload
