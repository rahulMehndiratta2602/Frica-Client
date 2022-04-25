import Search from "../../../components/Search"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { createProduct, getProduct, updateProduct } from "../../../functions/product"
import ProductCreateForm from "../../../components/ProductCreateForm"
import { getCategories, getCategorySubs } from "../../../functions/category"
import { useParams } from "react-router"
///////subCategoryOptions is for frontend. It represents all the subCategories belonging to a category. subCategories is for backend. It represents the selected subCategories from subCategoryOptions which belong to the product.
const initialState = {
    title: '',
    description: '',
    price: '',
    category: '',
    subCategories: [],
    subCategoryOptions: [],
    shipping: '',
    quantity: '',
    categories: [],
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue", "Red", "Golden", "Green"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS", "Acer", "Dell", "HP"],
    color: '',
    brand: '',
    categoryChangeCounter: 0
}

const UpdateProduct = () => {
    const params = useParams()
    const { user } = useSelector(state => ({ ...state }))
    const [values, setValues] = useState(initialState)
    const [characters, setCharacters] = useState(0)
    const fetchCategories = async () => {
        let categories = []
        try {
            const res = await getCategories()
            categories = res.data.data.categories
            setValues({ ...values, categories })
        }
        catch (err) {
            console.log(err)
        }

        return categories
    }
    const handleCategoryChange = (categoryId) => {

        // const newState = { ...values }
        // newState.subCategories = []
        // setValues(newState)
        getCategorySubs(categoryId)
            .then(res => {
                setValues({ ...values, subCategoryOptions: res.data.data.subCategories })
            })
            .catch(err => {
                toast.error(err.response.data.message)
                console.log(err.response.data.message)
            })

    }


    useEffect(() => {
        getProduct(params.slug)
            .then(async res => {
                const product = res.data.product
                let newValues = { ...values }
                Object.keys(product).map(key => {
                    newValues = { ...newValues, [key]: product[key] }
                })
                newValues.categories = await fetchCategories()
                setValues(newValues)
            }).catch(err => {
                console.log(err)
            })
    }, [])
    useEffect(() => {

        if (values.category && values.category !== "Please Select") {
            handleCategoryChange(values.category)
        }
    }, [values.category])

    const handleSubmit = e => {
        e.preventDefault()
        // console.log(values)
        updateProduct(user.token, values, params.slug)
            .then(res => {
                toast.success(`Product successfully updated.`)
                console.log(res.data.product)
            })
            .catch(err => {
                toast.error(err.response.data.message)
            })
        // fetchCategories()
    }
    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    return (<>
        <ProductCreateForm
            title="Update Product"
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            characters={characters}
            setCharacters={setCharacters}
            handleCategoryChange={handleCategoryChange}
            setValues={setValues}
            submitText="Update"

        />
    </>)
}

export default UpdateProduct
