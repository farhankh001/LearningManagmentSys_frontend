
import { z } from "zod";

// enum Enrollment_Status {
//   InProgress
//   Passed
//   Failed
// }





//rich text editor schemas

// Define the enums first
export const Education_Levels = z.enum([  
  "Primary",
  "Middle",
  "HighSchool",
  "Bachelor",
  "Masters",
  "Doctorate",
  "PhD",
  "Others"]);

export const Sales_Category = z.enum([
  "Free",
  "Basic",
  "Standard",
  "Premium",
  "Enterprise"
]);

export const Activation_Status = z.enum([
  "Active",
  "Inactive"
]);

const createCourseCategoriesSchema=(avaliableCategories:string[]=["OTHERS"])=>{
  return z.array(
    z.string().refine(
      val=>avaliableCategories.includes(val),
      "Selected category must be from avaliable categories."
    )
  ).min(1,"Atleast on category must be selected.")
}


const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const avatarSchema = z.custom<File | undefined>((file) => {
  if (!file) return false;
  return file instanceof File;
}, {
  message: "Course thumbnail is required!"
})
.refine((file) => {
  if (!file) return false;
  return file.size <= MAX_FILE_SIZE;
}, "File size must be less than 2MB")
.refine((file) => {
  if (!file) return false;
  return ACCEPTED_IMAGE_TYPES.includes(file.type);
}, "Only .jpg, .jpeg, .png and .webp formats are supported");
// Base schema for form inputs (matches form field types)




export const createCourseFormSchema = (availableCategories: string[] = ["OTHERS"])=>z.object({
  title: z.string().max(1000,"Title must not be longer then 1000 characters").refine(
    (val) => val.trim().split(/\s+/).length >= 5,
    "Title must be descriptive and should have at least 7 words."
  ),
  subtitle: z.string().max(500,"Subtitle must be smaller then 500 characters.").refine(
    (val) => val.trim().split(/\s+/).length >=7,
    "Description must be at least 10 words."
  ),
  description: z.string().max(5000,"Description must not have more then 5000 characters").refine(
    (val) => val.trim().split(/\s+/).length >= 25,
    "Description must be at least 25 words."
  ),
  level: Education_Levels,
  language: z.string().min(2,"Language must be longer then 2 character.").max(50,"Language must not have more then 50 characters."),
  activationStatus: Activation_Status,
  sales_category: Sales_Category,
  course_thumbnail:avatarSchema,
  course_category:createCourseCategoriesSchema(availableCategories),
  price: z.string()
  .refine(
    (val) => !isNaN(Number(val)),
    "Price must be a valid number"
  )
  .refine(
    (val) => Number(val) >= 0,
    "Price cannot be negative"
  )
  .refine(
    (val) => Number(val) <= 999999.99,
    "Price cannot exceed 999,999.99"
  )
  .refine(
    (val) => Number(Number(val).toFixed(2)) === Number(val),
    "Price can only have up to 2 decimal places"
  ),
  duration: z.string()
  .refine(
    (val) => !isNaN(Number(val)),
    "Duration must be a valid number"
  )
  .refine(
    (val) => Number(val) > 0,
    "Duration must be greater than 0"
  )
  .refine(
    (val) => Number(val) <= 500,
    "Duration cannot exceed 500 hours"
  )
  .refine(
    (val) => Number(Number(val).toFixed(1)) === Number(val),
    "Duration can only have up to 1 decimal place"
  ),
  preRequisites:z.string().min(100,"Pre-Requisites is required and must have atleast 100 characters."),
  whatYouWillLearn:z.string()
});

// Schema for validated data (after processing)
export const createCourseSchema = (availableCategories: string[] = ["OTHERS"]) => 
  createCourseFormSchema(availableCategories).transform((data) => ({
    ...data,
    price: Number(data.price),
    duration: Number(data.duration)
  }));

// Types
export type CreateCourseFormType = z.infer<ReturnType<typeof createCourseFormSchema>>;
export type CreateCourseType = z.infer<ReturnType<typeof createCourseSchema>>;

// Default values
export const createCourseDefaultValues: CreateCourseFormType = {
  title: "",
  subtitle: "",
  description: "",
  level: "Others",
  language: "English",
  activationStatus: "Active",
  price: "0",
  sales_category: "Free",
  duration: "0",
  course_thumbnail:undefined,
  course_category:[],
  preRequisites:"",
  whatYouWillLearn:""
};

////////edit cousr//////////////
const editCorseThumbnail = z.union([
  // Case 1: File validation
  z
    .custom<File>((file) => file instanceof File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File size must be less than 2MB",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg, .png and .webp formats are supported",
    }),

  // Case 2: URL validation for string
  z
    .string()
    .url("Thumbnail must be a valid URL"),
]);

export const editCourseFormSchema = (availableCategories: string[] = ["OTHERS"])=>z.object({
  title: z.string().min(3,"Title must be longer then 3 characters").max(100,"Title must be less then 100 characters"),
  subtitle: z.string().max(500,"Subtitle must be smaller then 200 characters.").refine(
    (val) => val.trim().split(/\s+/).length >= 5,
    "Description must be at least 5 words."
  ),
  description: z.string().max(5000,"Description must not have more then 5000 characters").refine(
    (val) => val.trim().split(/\s+/).length >= 25,
    "Description must be at least 25 words."
  ),
  level: Education_Levels,
  language: z.string().min(2,"Language must be longer then 2 character.").max(50,"Language must not have more then 50 characters."),
  activationStatus: Activation_Status,
  sales_category: Sales_Category,
  course_thumbnail:editCorseThumbnail,
  course_category:createCourseCategoriesSchema(availableCategories),
  price: z.string()
  .refine(
    (val) => !isNaN(Number(val)),
    "Price must be a valid number"
  )
  .refine(
    (val) => Number(val) >= 0,
    "Price cannot be negative"
  )
  .refine(
    (val) => Number(val) <= 999999.99,
    "Price cannot exceed 999,999.99"
  )
  .refine(
    (val) => Number(Number(val).toFixed(2)) === Number(val),
    "Price can only have up to 2 decimal places"
  ),
  duration: z.string()
  .refine(
    (val) => !isNaN(Number(val)),
    "Duration must be a valid number"
  )
  .refine(
    (val) => Number(val) > 0,
    "Duration must be greater than 0"
  )
  .refine(
    (val) => Number(val) <= 500,
    "Duration cannot exceed 500 hours"
  )
  .refine(
    (val) => Number(Number(val).toFixed(1)) === Number(val),
    "Duration can only have up to 1 decimal place"
  ),
  preRequisites:z.string().min(100,"Pre-Requisites is required and must have atleast 100 characters."),
  whatYouWillLearn:z.string()
});

// Schema for validated data (after processing)
export const editCourseSchema = (availableCategories: string[] = ["OTHERS"]) => 
  editCourseFormSchema(availableCategories).transform((data) => ({
    ...data,
    price: Number(data.price),
    duration: Number(data.duration)
  }));

export type EditCourseFormType = z.infer<ReturnType<typeof editCourseFormSchema>>;
export type EditCourseType = z.infer<ReturnType<typeof editCourseSchema>>;