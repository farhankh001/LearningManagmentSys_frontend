import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
// "http://localhost:5000"
// baseUrl:,"http://192.168.3.5:5000"
export const BASEURL="http://192.168.3.5:5000"
export const baseApi = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({
         baseUrl:BASEURL,
        credentials:"include"
    }),
    tagTypes: ['Categories','Courses',"User","Enrollment","Teacher","StdActiveTime"],
    endpoints:()=>({})
})


export default baseApi;