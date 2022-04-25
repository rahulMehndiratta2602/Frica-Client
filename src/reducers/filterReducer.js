const initialState = {
    showFilter: true,
    priceRange: [0, 300000],
    sort: '',
    shipping: '',
    chosenColors: [],
    chosenBrands: [],
    minRating: 0,
    search: '',
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS", "Acer", "Dell", "HP"],
    colors: ["Black", "Brown", "Silver", "White", "Blue", "Red", "Golden", "Green"],
    category: "",
    chosenSubCategories: [],
    subCategories: [],
}
const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case "TOGGLE_SHOW_FILTER":
            return action.payload
        case "UPDATE_FILTER":
            return action.payload
        case "RESET_FILTER":
            return { ...initialState, categories: state.categories }
        default:
            return state
    }
}

export default filterReducer
