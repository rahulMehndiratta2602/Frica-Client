import { combineReducers } from "redux"
import filterReducer from "./filterReducer"
import userReducer from "./userReducer"
import cartReducer from "./cartReducer"
import cartPopupReducer from "./cartPopupReducer"


const rootReducer = combineReducers({
    user: userReducer,
    filter: filterReducer,
    cart: cartReducer,
    cartPopup: cartPopupReducer
})
export default rootReducer