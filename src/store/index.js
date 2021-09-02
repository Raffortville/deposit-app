import { combineReducers } from "redux"
import userStore from "./userStore"

const rootReducer = combineReducers({
    users: userStore
})


export default rootReducer
