import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
// baseUrl:"http://192.168.3.5:5000",

export const baseApi = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({
         baseUrl:"http://192.168.3.5:5000",
        credentials:"include"
    }),
    tagTypes: ['Categories','Courses',"User","Enrollment","Teacher"],
    endpoints:()=>({})
})


export default baseApi;