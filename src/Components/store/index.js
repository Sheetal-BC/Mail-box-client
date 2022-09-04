import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";



const store = configureStore({
  reducer: {
    user : authReducer,
    
  },
});

export default store;
