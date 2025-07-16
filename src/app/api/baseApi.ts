import {createApi} from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQuerywithReauth";


export const baseApi = createApi({
    reducerPath:"api",
    baseQuery:baseQueryWithReauth,
    tagTypes: ['Categories','Courses',"User","Enrollment","Teacher","StdActiveTime"],
    endpoints:()=>({})
})


export default baseApi;