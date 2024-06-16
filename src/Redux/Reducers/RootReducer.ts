import { combineReducers } from "redux";
import adminReducer from "./admin.slice";
// import messagesReducer from "./messages.slice"
import linesReducer from "./lines.slice"


export default combineReducers({
     authState: adminReducer,
     // messagesState:messagesReducer,
     linesState:linesReducer
})