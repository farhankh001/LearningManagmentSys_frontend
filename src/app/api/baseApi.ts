import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"


export const baseApi = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://192.168.3.5:5000",
        credentials:"include"
    }),
    tagTypes: ['Categories','Courses',"User","Enrollment"],
    endpoints:()=>({})
})


export default baseApi;