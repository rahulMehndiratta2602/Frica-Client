import { DeleteFilled, EditFilled } from "@ant-design/icons"
import Search from "../../../components/Search"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { getCategories } from "../../../functions/category"
import { createSubCategory, getSubCategories, deleteSubCategory, updateSubCategory, getSubCategory } from "../../../functions/subCategory"



const SubCategories = () => {
    const [newSubCategory, setNewSubCategory] = useState('')
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [updatingSlug, setUpdatingSlug] = useState('')
    const [updating, setUpdating] = useState('')
    const [updatingParent, setUpdatingParent] = useState('')

    const [keyword, setKeyword] = useState('')
    const [parentKeyword, setParentKeyword] = useState('')

    const [parentCategory, setParentCategory] = useState('Select a Parent Category')

    const { user } = useSelector(state => ({ ...state }))
    const handleCreate = async () => {
        try {
            const res = await createSubCategory(user.token, { name: newSubCategory, parent: parentCategory })
            // console.log(res.data)
            toast.success(`${res.data.subCategory.name} added`)
            setParentCategory('Select a Parent Category')
            setNewSubCategory('')
            fetchSubCategories()
        }
        catch (err) {
            toast.error(err.response.data.message)
        }
    }
    const deleteSubCatClicked = async (subCat) => {
        try {
            const res = await deleteSubCategory(user.token, subCat.slug)
            fetchSubCategories()

        }
        catch (err) {
            console.log(err)
        }
    }
    const fetchCategories = () => {
        getCategories().then(res => setCategories(res.data.data.categories)
        )
    }
    const fetchSubCategories = () => {
        getSubCategories().then(res => {
            // console.log(res)
            setSubCategories(res.data.data.subCategories)
        })
    }
    const handleUpdate = async () => {
        try {
            const prevRes = await getSubCategory(updatingSlug)
            const res = await updateSubCategory(user.token, { name: updating, parent: updatingParent }, updatingSlug)
            fetchSubCategories()
            toast.success(`(${prevRes.data.subCategory.parent.name})${prevRes.data.subCategory.name}-->(${res.data.subCategory.parent.name})${res.data.subCategory.name}`)
            setUpdating('')
            setUpdatingSlug("")
        }
        catch (err) {
            toast.error(err.response.data.message)
        }

    }
    const search = (keyword) => (c) => {
        return c.name.toLowerCase().includes(keyword)
    }
    const searchParent = (keyword) => (c) => {
        return c.parent.name.toLowerCase().includes(keyword)
    }
    useEffect(() => {
        fetchSubCategories()
        fetchCategories()
    }, [])
    return (
        <div className="form-admin">
            <div className="form-admin-input-container pb-0">

                <select
                    name="categorySelect"
                    className="form-admin-select w-full sm:w-[40%]"
                    id="categorySelect"
                    value={parentCategory}
                    onChange={e => {
                        setParentCategory(e.target.value)
                    }}
                >
                    <option disabled className="text-sm " >Select a Parent Category</option>
                    {
                        categories.length > 0 && categories.map((cat) => {
                            return <option className="text-primary text-sm bg-white " key={cat._id} value={cat._id}>{cat.name}</option>
                        })}
                </select>
                <input
                    type="text"
                    name="addCategory"
                    id="addCategory"
                    placeholder={`sub category eg:"Ipad"`} className="w-full sm:w-[55%] form-admin-input"
                    spellCheck="false"
                    autoFocus
                    value={newSubCategory}
                    onChange={(e) => {
                        setNewSubCategory(e.target.value)
                    }}
                    onFocus={e => {
                        setUpdating("")
                        setUpdatingSlug("")
                    }}
                    autoComplete="off"
                />

                <button className="form-submit h-[30px] text-xs sm:text-sm sm:flex-shrink-0" onClick={() => handleCreate()}>Add Sub Category</button>
            </div>
            <div className="sm:flex block w-full relative space-y-2 sm:space-x-4 sm:space-y-0">
                <Search keyword={keyword} setKeyword={setKeyword} placeholder="Search sub-category..." width="80%" />
                <Search keyword={parentKeyword} setKeyword={setParentKeyword} placeholder="Search category..." width="80%" />
            </div>

            <h1 className="text-lg text-white">All Sub-Categories({subCategories.length}):</h1>
            <div className="flex w-full relative flex-col pb-20 space-y-2 overflow-hidden overflow-y-scroll scrollhost">
                {
                    subCategories.filter(search(keyword.toLowerCase())).filter(searchParent(parentKeyword.toLowerCase())).map((subcat, i) => {
                        if (updatingSlug === subcat.slug) return (
                            <div
                                key={subcat._id}
                                className="w-full relative flex space-x-2 ">
                                <select
                                    name="categorySelect"
                                    className="form-admin-select w-full sm:w-[40%]"
                                    id="categorySelect"
                                    value={updatingParent}
                                    onChange={e => {
                                        setUpdatingParent(e.target.value)
                                    }}
                                >
                                    <option disabled className="text-sm " >Select a Parent Category</option>
                                    {
                                        categories.length > 0 && categories.map((cat) => {
                                            return <option className="text-primary text-sm bg-white " key={cat._id} value={cat._id}>{cat.name}</option>
                                        })}
                                </select>
                                <input
                                    type="text"
                                    value={updating}
                                    placeholder="updatedCategory"
                                    className="w-[85%] flex-shrink sm:flex-shrink form-admin-input"
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

                        return <div className="w-full relative bg-lightest text-secondary rounded-sm px-4 space-x-3 py-1 flex justify-start items-center" key={subcat._id}>{i + 1}. <span className="text-black mx-2">{`${subcat.parent.name}`} </span> {subcat.name}
                            <DeleteFilled className="!text-red-600 !ml-auto cursor-pointer h-[16px]"
                                onClick={() => deleteSubCatClicked(subcat)} />
                            <EditFilled
                                className="!text-tertiary cursor-pointer"
                                onClick={() => {
                                    setUpdatingSlug(subcat.slug)
                                    setUpdating(subcat.name)
                                    setUpdatingParent(subcat.parent._id)
                                }}
                            />
                        </div>
                    })
                }
            </div>

        </div >
    )
}

export default SubCategories
