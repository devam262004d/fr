import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import allJobReducer from "../store/slices/allJobSlice";

const store = configureStore({
    reducer:{
    auth: authReducer,
    allJob:allJobReducer,
    }
});

export default store;