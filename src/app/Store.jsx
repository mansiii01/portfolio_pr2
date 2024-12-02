import { configureStore } from "@reduxjs/toolkit";
import  Api  from "../features/Feature";

export const store = configureStore({
    reducer:{
        apiKey : Api
    }
})