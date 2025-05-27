import {configureStore} from "@reduxjs/toolkit"
import baseApi from "./api/baseApi"
import authReducer from "./slices/authSlice"
import categoryReducer from "./slices/categorySlice"
import courseReducer from "./slices/courseSlice"


export const store =configureStore({
    reducer:{
        [baseApi.reducerPath]:baseApi.reducer,
        auth:authReducer,
        categories:categoryReducer,
        courses:courseReducer
    },
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware().concat(baseApi.middleware)
    }
})

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;