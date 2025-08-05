import { setUser } from "../slices/authSlice";
import { baseApi } from "./baseApi";




interface LoggedInUserType {
  name: string;
  email: string;
  role: string;
  bio: string;
  email_verified: boolean;
  profile_picture?: string;
};

interface LogInReturntype {
  accessToken: string;
  user: LoggedInUserType
}


export type StudentProfileResponse = {
  success: boolean;
  profile: {
    user: {
      id: string;
      name: string;
      email: string;
      role: string; // adjust based on your enum
    };
    username: string;
    gender: string;
    certifications: { name: string }[]; // or string if stored as comma-separated string
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    activeTime: number;
    education: {
      id: string;
      student_id: string;
      level: string;
      schoolName?: string | null;
      university?: string | null;
      degree?: string | null;
      sessionStart?: string | null;
      sessionEnd?: string | null;
      semester?: string | null;
      yearOfStudy?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
    expertise: {
      category: string;
      techStack: string;
      level: "Beginner" | "Intermediate" | "Expert";
    }[];

  };
};

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    registerUser: builder.mutation<any, any>({
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

    loggedInUserInof: builder.query<LoggedInUserType, void>({
      query: () => ({
        method: "GET",
        url: "/loggedIn_user",
      }),
      providesTags: ["User"]
    }),
    logOutUser: builder.mutation<any, void>({
      query: () => ({
        url: "/logout",
        method: "POST"
      }),
      invalidatesTags: ["Enrollment", "StdActiveTime", "Courses", "User"]
    }),
    registerTeacher: builder.mutation<any, FormData>({
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
    verifyCaptcha: builder.mutation<any, { token: string }>({
      query: (data) => ({
        url: '/verify-captcha',
        method: 'POST',
        body: data,
      }),
    }),
    getStudentProfile: builder.query<StudentProfileResponse, void>({
      query: () => ({
        method: "GET",
        url: "get-student-profile"
      })
    })
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useLoggedInUserInofQuery, useLogOutUserMutation, useRegisterTeacherMutation, useLazyRefreshTokenQuery, useVerifyCaptchaMutation, useGetStudentProfileQuery } = userApi;
