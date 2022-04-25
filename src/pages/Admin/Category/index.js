import { DeleteFilled, EditFilled } from "@ant-design/icons"
import Search from "../../../components/Search"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { createCategory, getCategories, deleteCategory, updateCategory, getCategory } from "../../../functions/category"


const Categories = () => {
    const [newCategory, setNewCategory] = useState('')
    const [categories, setCategories] = useState([])
    const [updatingSlug, setUpdatingSlug] = useState('')
    const [updating, setUpdating] = useState('')
    const [keyword, setKeyword] = useState('')

    const { user } = useSelector(state => ({ ...state }))
    const handleCreate = async () => {
        try {
            const res = await createCategory(user.token, { name: newCategory })
            toast.success(`${res.data.category.name} added`)
            setNewCategory('')
            fetchCategories()
        }
        catch (err) {
            toast.error(err.response.data.message)
        }
    }
    const deleteCatClicked = async (cat) => {
        try {
            const res = await deleteCategory(user.token, cat.slug)
            fetchCategories()

        }
        catch (err) {
            console.log(err)
        }
    }
    const fetchCategories = () => {
        getCategories().then(res => setCategories(res.data.data.categories)
        )

    }
    const handleUpdate = async () => {
        try {
            const prevRes = await getCategory(updatingSlug)
            const res = await updateCategory(user.token, { name: updating }, updatingSlug)
            fetchCategories()
            toast.success(`${prevRes.data.category.name}-->${res.data.category.name}`)
        }
        catch (err) {
            toast.error(err.response.data.message)
        }

    }
    const search = (keyword) => (c) => {
        return c.name.toLowerCase().includes(keyword)
    }
    useEffect(() => {

        fetchCategories()
    }, [])
    return (
        <div className="form-admin">
            <div className="form-admin-input-container">

                <input
                    type="text"
                    name="addCategory"
                    id="addCategory"
                    placeholder={`category eg:"Lenovo"`}
                    className="w-full sm:w-[85%] form-admin-input"
                    spellCheck="false"
                    autoFocus
                    value={newCategory}
                    onChange={(e) => {
                        setNewCategory(e.target.value)
                    }}
                    onFocus={e => {
                        setUpdating("")
                        setUpdatingSlug("")
                    }}
                    required
                    autoComplete="off"
                />

                <button className="form-submit h-[30px] text-xs sm:text-sm sm:flex-shrink-0" onClick={() => handleCreate()}>Add Category</button>
            </div>
            <Search keyword={keyword} setKeyword={setKeyword} placeholder="Search..." width="40%" />
            <h1 className="text-lg text-white">All Categories({categories.length}):</h1>
            <div className="flex w-full relative flex-col pb-20 space-y-3 overflow-hidden overflow-y-scroll scrollhost">
                {
                    categories.filter(search(keyword.toLowerCase())).map((cat, i) => {
                        if (updatingSlug === cat.slug) return (
                            <div
                                key={cat._id}
                                className="w-full relative flex ">
                                <input
                                    type="text"
                                    value={updating}
                                    placeholder="updatedCategory"
                                    className=" w-[85%] flex-shrink sm:flex-shrink form-admin-input"
                                    spellCheck="false"
                                    onChange={e => setUpdating(e.target.value)}
                                />
                                <button
                                    className=" text-white bg-tertiary px-1 rounded-lg hover:opacity-60 sm:ml-6 text-xs sm:text-sm"
                                    onClick={handleUpdate}
                                >Update</button>
                                <button
                                    className="text-white bg-red-600 px-1 rounded-lg hover:opacity-60 sm:ml-2 text-xs sm:text-sm"
                                    onClick={() => setUpdatingSlug("")}
                                >Cancel</button>
                            </div>
                        )

                        return <div className="w-full relative bg-lightest text-secondary rounded-sm px-4 space-x-3 py-1 flex justify-start items-center" key={cat._id}>{i + 1}. {cat.name}
                            <DeleteFilled className="!text-red-600 !ml-auto cursor-pointer h-[16px]"
                                onClick={() => deleteCatClicked(cat)} />
                            <EditFilled
                                className="!text-tertiary cursor-pointer"
                                onClick={() => {
                                    setUpdatingSlug(cat.slug)
                                    setUpdating(cat.name)
                                }}
                            />
                        </div>
                    })
                }
            </div>

        </div >
    )
}

export default Categories
