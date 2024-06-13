import { combineReducers } from "redux";
import adminReducer from "./admin.slice";
import productsReducer from "./products.slice";
// import messagesReducer from "./messages.slice"
import linesReducer from "./lines.slice"


export default combineReducers({
     authState: adminReducer,
     productsState:productsReducer,
     // messagesState:messagesReducer,
     linesState:linesReducer
})