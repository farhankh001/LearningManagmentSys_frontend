import {baseApi} from "./baseApi";


type StudentData =  {
  education_level: "PRIMARY_SCHOOL" | "MIDDLE_SCHOOL" | "HIGH_SCHOOL" | "BACHELOR" | "MASTERS" | "DOCTORATE" | "PHD" | "OTHER";
  interests: string[];
};

type TeacherData = {
  qualifications: string;
  teacher_expertise: string[];
};

type AdminData = {
  
};

type RegistrationRequest = {
  userData: {
    name: string;
    email: string;
    password: string;
    role: "Student" | "Teacher" | "Admin";
    bio?: string | null;
    profile_picture: string;
  };
  roleSpecificData: StudentData | TeacherData | AdminData;
};


interface LoggedInUserType{
        name:string;
        email:string;
        role:string;
        bio:string;
        email_verified:boolean;
        profile_picture?:string;
    };

interface LogInReturntype{
  user:{
    role:string,
  id:string
  }
}
export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Registration Mutation
    registerUser: builder.mutation<any,FormData>({
      query: (formData) => ({
        url: '/create-user', // Backend endpoint for registration
        method: 'POST', // HTTP method
        body: formData, // Data to send in the request body
      }),
    }),
    loginUser:builder.mutation<LogInReturntype,any>({
        query:(loginData)=>({
            url:"/login",
            method:"POST",
            body:loginData,
            credentials:'include'
        }),
        invalidatesTags:["User","Enrollment","StdActiveTime"]
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
        url: '/create-Teacher', // Backend endpoint for registration
        method: 'POST', // HTTP method
        body: formData, // Data to send in the request body
      }),
    }),
  }),
});

export const { useRegisterUserMutation,useLoginUserMutation,useLoggedInUserInofQuery,useLogOutUserMutation,useRegisterTeacherMutation } = userApi;
