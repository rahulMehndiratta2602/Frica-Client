let initialState = {
    show: false,
    title: "",
    itemPresent: false
}

const cartPopupReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SHOW_MODAL":
            return action.payload
        case "HIDE_MODAL":
            return action.payload
        default:
            return state
    }
}

export default cartPopupReducer
