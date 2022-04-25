import Search from "../../../components/Search"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { createProduct } from "../../../functions/product"
import ProductCreateForm from "../../../components/ProductCreateForm"
import { getCategories, getCategorySubs } from "../../../functions/category"
///////subCategoryOptions is for frontend. It represents all the subCategories belonging to a category. subCategories is for backend. It represents the selected subCategories from subCategoryOptions which belong to the product.
const initialState = {
    title: '',
    description: '',
    price: '',
    category: 'Please Select',
    subCategories: [],
    subCategoryOptions: [],
    shipping: 'Please Select',
    quantity: '10',
    categories: [],
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue", "Red", "Golden", "Green"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS", "Acer", "Dell", "HP"],
    color: 'Please Select',
    brand: 'Please Select',
    categoryChangeCounter: 0
}

const CreateProduct = () => {
    const { user } = useSelector(state => ({ ...state }))
    const [values, setValues] = useState(initialState)
    const [characters, setCharacters] = useState(0)
    const fetchCategories = () => {
        getCategories().then(res => setValues({ ...values, categories: res.data.data.categories })
        )
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
        fetchCategories()
        initialState.images = []
        setValues(initialState)
    }, [])
    useEffect(() => {

        if (values.category && values.category !== "Please Select") {
            handleCategoryChange(values.category)
        }
    }, [values.category])
    const handleSubmit = e => {
        e.preventDefault()
        // console.log(values)
        createProduct(user.token, values)
            .then(res => {
                toast.success(`Product created: ${res.data.newProduct.title}`)
                const newValues = { ...initialState, images: [], categories: values.categories }
                setValues(newValues)
                // setTimeout(() => { window.location.reload() }, 1000)



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
            title="Create Product"
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            characters={characters}
            setCharacters={setCharacters}
            handleCategoryChange={handleCategoryChange}
            setValues={setValues}
            submitText="Create"
        />
    </>)
}

export default CreateProduct
