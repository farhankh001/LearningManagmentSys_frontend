import {z} from "zod"
// const passwordREGEX = /^(?=.*[A-Za-z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/;


const emailSchema = z.string().email({ message: "Not Valid Email Format!" });
const passwordSchema = z
  .string()
  .min(1, { message: "Password should be at least 8 characters long" })
//   .refine((pass) => passwordREGEX.test(pass), {
//     message:
//       "At least 8 characters long. Must contain at least one uppercase letter, at least one lowercase letter, at least one digit, and at least one special character (e.g., !@#$%^&*).",
//   });


export const loginSchema=z.object({
    email:emailSchema,
    password:passwordSchema,
})


export type LoginType=z.infer<typeof loginSchema>
export const loginDefault:LoginType={
    email:"",
     password:""
}
