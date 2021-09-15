import { combineReducers } from "redux";
import authReducers from "./auth.reducers";
import registerReducer from "./register.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
  auth: authReducers,
  user: userReducer,
  register: registerReducer,
});

export default rootReducer;
