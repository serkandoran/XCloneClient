

import { combineReducers } from "redux";
import userReducer from './UserStore.js';
import authReducer from "./AuthStore.js";
import uiReducer from "./Ui.js";
import PostsReducer from "./Posts.js";



const rootReducer = combineReducers({
   auth: authReducer,
   user: userReducer,
   ui: uiReducer,
   posts: PostsReducer
})

export default rootReducer




