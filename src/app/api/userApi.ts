import { setUser } from "../slices/authSlice";
import {baseApi} from "./baseApi";




interface LoggedInUserType{
        name:string;
        email:string;
        role:string;
        bio:string;
        email_verified:boolean;
        profile_picture?:string;
    };

interface LogInReturntype{
  accessToken:string;
  user:LoggedInUserType
}
export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    registerUser: builder.mutation<any,FormData>({
      query: (formData) => ({
        url: '/create-user',
        method: 'POST', 
        body: formData, 
      }),
    }),
   loginUser: builder.mutation<LogInReturntype, any>({
  query: (loginData) => ({
    url: '/login',
    method: 'POST',
    body: loginData,
  }),
  async onQueryStarted(_, { dispatch, queryFulfilled }) {
    try {
      const { data } = await queryFulfilled;
      dispatch(setUser({ ...data.user, accessToken: data.accessToken }));
    } catch (error) {
      console.log(error)
    
    }
  },
  invalidatesTags: ['User', 'Enrollment', 'StdActiveTime'],
}),

    loggedInUserInof:builder.query<LoggedInUserType,void>({
      query:()=>({
        method:"GET",
        url:"/loggedIn_user",
      }),
      providesTags:["User"]
    }),
    logOutUser:builder.mutation<any,void>({
      query:()=>({
        url:"/logout",
        method:"POST"
      }),
      invalidatesTags:["Enrollment","StdActiveTime","Courses","User"]
    }),
    registerTeacher: builder.mutation<any,FormData>({
      query: (formData) => ({
        url: '/create-Teacher', 
        method: 'POST',
        body: formData,
      }),
    }),
    refreshToken: builder.query<LogInReturntype, void>({
  query: () => ({
    url: "/refresh-token",
    method: "POST",
  }),
  async onQueryStarted(_, { dispatch, queryFulfilled }) {
    try {
      const { data } = await queryFulfilled;
      dispatch(setUser({ ...data.user, accessToken: data.accessToken }));
    } catch (error) {
      console.error("Refresh failed", error);
      // Optionally dispatch(clearUser()) if you want to force logout
    }
  },
}),
  }),
});

export const { useRegisterUserMutation,useLoginUserMutation,useLoggedInUserInofQuery,useLogOutUserMutation,useRegisterTeacherMutation,useLazyRefreshTokenQuery } = userApi;
