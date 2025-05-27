import baseApi from "./baseApi";

interface enrollmentInterface{
    courseId:string
}

const enrollments=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        enrollStudent:builder.mutation<any,enrollmentInterface>({
            query:(data)=>({
                body:data,
                method:"POST",
                url:"/enroll-student"
            }),
            invalidatesTags:["Enrollment"]
        })
    })
})

export const {useEnrollStudentMutation}=enrollments

