import { z } from "zod";

// const passwordREGEX = /^(?=.*[A-Za-z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/;

const usernameSchema = z
  .string()
  .min(3, { message: "User Name is REQUIRED!" })
  .max(100, { message: "User Name cannot have more than 100 Characters." });

const emailSchema = z.string().email({ message: "Not Valid Email Format!" });
const passwordSchema = z
  .string()
  .min(1, { message: "Password should be at least 8 characters long" })
  // .refine((pass) => passwordREGEX.test(pass), {
  //   message:
  //     "At least 8 characters long. Must contain at least one uppercase letter, at least one lowercase letter, at least one digit, and at least one special character (e.g., !@#$%^&*).",
  // const defaultFile = new File([], "default.jpg"); // Default empty file

  
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const avatarSchema = z.custom<File|null>((file) => file instanceof File || file === null, {
    message: "Please submit a valid picture as avatar!"
})
.refine((file) => {
    if (file === null) return true; // Allow null for optional file
    return file.size <= MAX_FILE_SIZE;
}, "File size must be less than 2MB")
.refine((file) => {
    if (file === null) return true; // Allow null for optional file
    return ACCEPTED_IMAGE_TYPES.includes(file.type);
}, "Only .jpg, .jpeg, .png and .webp formats are supported");
// Define the role enum



export const baseRegisterSchema = z.object({

});



// enum Approval_Status {
//   Pending
//   Approved
//   Rejected
// }


export const createStudentSchema=(avaliableCategories:string[])=>z.object({
  name: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
  profile_picture:avatarSchema.optional(),
  role:z.enum(["Student"]),//always keep this in this formate first letter capital others small.
  education_level:z.enum([  
  "Primary",
  "Middle",
  "HighSchool",
  "Bachelor",
  "Masters",
  "Doctorate",
  "PhD",
  "Others"]),
    interests:z.array(
      z.string().refine(val=>avaliableCategories.includes(val),"Selected expertise must be from available categories")
    ).min(1,"Select at least one expertise area.").max(5,"You cannot select more then 5 expertise")

});

// const createTeacherSchema=(availableCategories:string[])=>z.object
// ({
//   qualifications:z.string().max(255,"Entry not more then 255 is allowed.").min(1,"You must enter your Qualifications."),
//   teacher_expertise:z.array(
//     z.string().refine(val=>availableCategories.includes(val),"Selected expertise must be from availabe categories.")
//   ) .min(1, "Select at least one expertise area")
//   .max(5, "You can select up to 5 areas of expertise")
// })




export type BaseDefaultType=z.infer<typeof baseRegisterSchema>
export type RegisterType = z.infer<ReturnType<typeof createStudentSchema>>;
export const registerDefaultValues:RegisterType={
  name: "",
  email: "",
  password: "",
  profile_picture:null,
  role:"Student",
  education_level:"Bachelor",
  interests:[]
}


export const createTeacherSchema=(availableCategories:string[])=>z.object({
  name: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
  profile_picture:avatarSchema.optional(),
  role:z.enum(["Teacher"]),//always keep this in this formate first letter capital others small.
  qualifications:z.string().max(255,"Entry not more then 255 is allowed.").min(1,"You must enter your Qualifications."),
  teacher_expertise:z.array(
    z.string().refine(val=>availableCategories.includes(val),"Selected expertise must be from availabe categories.")
  ) .min(1, "Select at least one expertise area")
  .max(5, "You can select up to 5 areas of expertise")

});


export type TeacherRegisterType = z.infer<ReturnType<typeof createTeacherSchema>>;

export const registerTeacherDefaultValues:TeacherRegisterType={
  name: "",
  email: "",  
  password: "",
  profile_picture:null,
  role:"Teacher",
  qualifications:"",
  teacher_expertise:[]
}






// export const createRegisterSchema=(availabeCategories:string[])=>{
//   return z.discriminatedUnion("role",[
//     z.object({
//       ...baseRegisterSchema.shape,
//       role:z.literal("Student"),
//       ...createStudentSchema(availabeCategories).shape
//     }),
//     z.object({
//       ...baseRegisterSchema.shape,
//       role:z.literal("Teacher"),
//       ...createTeacherSchema(availabeCategories).shape
//     }),
//     z.object({
//       ...baseRegisterSchema.shape,
//       role:z.literal("Admin")
//     })
//   ])
// }
