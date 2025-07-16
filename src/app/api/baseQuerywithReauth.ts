import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { clearUser, setUser } from "../slices/authSlice";




const rawBaseQuery=fetchBaseQuery({
    baseUrl:"http://localhost:5000",
    credentials:"include",
    prepareHeaders:(headers,{getState}:any)=>{
        const token=getState().auth?.accessToken;
        if(token){
            headers.set("Authorization",`Bearer ${token}`)
        }
        return headers
    },

});

export const baseQueryWithReauth:BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
>=async(args,api,extraOptions)=>{
    let result=await rawBaseQuery(args,api,extraOptions);
    const noRefreshPaths=["/login","/register","/refresh-token"]
    const url=typeof args==="string"?args:args.url;
    if(result.error?.status===401&&!noRefreshPaths.includes(url)){
        console.warn("Access token expired, trying to refresh...")
    

    const refreshResult=await rawBaseQuery({
        url:"/refresh-token",
        method:"POST",

    },api,extraOptions)


    if(refreshResult.data){
        const {accessToken,user}=refreshResult.data as{
            accessToken:string;
            user:any,
        }

        api.dispatch(setUser({...user,accessToken}));
        result=await rawBaseQuery(args,api,extraOptions);
    }else{
        api.dispatch(clearUser());
        return refreshResult;
    }
    }
    return result;
    
}