import z, { string } from "zod"
import CreateLesson from "../pages/lessons/CreateLesson";
import { QuizSharp } from "@mui/icons-material";


const videoMimeTypes = [
  "video/mp4",
  "video/webm",
  "video/ogg",
];

const documentMimeTypes = [
  "application/pdf",
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/vnd.ms-powerpoint", // .ppt
  "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
];

const imageMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];


const ActivationStatusEnum = z.enum(["ACTIVE", "INACTIVE"]);

// 2. Schema for Quiz (optional)
const QuizAndAssignmentSchema = z.object({
  title: z.string().min(1, "Quiz title is required"),
  description: z.string().optional(),
  question: z.string().min(1, "Question is required"),
  timeLimit: z.string()
    .refine(
      (val) => !isNaN(Number(val)),
      "Time limit must be a valid number (in minutes)"
    )
    .refine(
      (val) => Number(val) > 0,
      "Time limit must be greater than 0"
    )
    .refine(
      (val) => Number(Number(val).toFixed(1)) === Number(val),
      "Time limit can only have up to 1 decimal place"
    ),
  activationStatus: ActivationStatusEnum,
  passingScore: z.string()
    .refine(
      (val) => !isNaN(Number(val)),
      "Passing scores must be a valid number"
    )
    .refine(
      (val) => Number(val) > 0,
      "Passing scores must be greater than 0"
    )
    .refine(
      (val) => Number(Number(val).toFixed(1)) === Number(val),
      "Passing score can only have up to 1 decimal place"
    ),
  totalScore: z.string()
    .refine(
      (val) => !isNaN(Number(val)),
      "Total score must be a valid number"
    )
    .refine(
      (val) => Number(val) >= 0,
      "Total score cannot be negative"
    )
    .refine(
      (val) => Number(val) <= 999999.99,
      "Total score cannot exceed 999,999.99"
    )
    .refine(
      (val) => Number(Number(val).toFixed(2)) === Number(val),
      "Total score can only have up to 2 decimal places"
    ),
});


const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_DOC_SIZE = 10 * 1024 * 1024;   // 10MB
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;  // 5MB

export const createLessonSchema = z.object({
  lesson_video: z.custom<File|undefined>((file)=>{
    if(!file) return false;
    return file instanceof File;
  },{
    message:"Lesson video is required!"
  }).refine((file)=>{
    if(!file) return false
    return file.size<=MAX_VIDEO_SIZE
  },{message:"Videos more then 50MBs are not allowed."}).refine((file)=>{
    if(!file){
        return false;
    } 
    return videoMimeTypes.includes(file.type)
  },{message:"video/mp4, video/webm, video/ogg are supported."}),
    

  lesson_document: z.custom<File|undefined>((file)=>{
    if(!file) return false;
    return file instanceof File;
  },{
    message:"Lesson document is required!"
  }).refine((file)=>{
    if(!file) return false
    return file.size<=MAX_DOC_SIZE
  },{message:"Documents more then 10MBs are not allowed."}).refine((file)=>{
    if(!file){
        return false;
    } 
    return documentMimeTypes.includes(file.type)
  },{message:"pdf, ms-word and ms-powerpoint is supported."}),


  lesson_image: z.custom<File|undefined>((file)=>{
    if(!file) return false;
    return file instanceof File;
  },{
    message:"Lesson thumbnail is required",

  }).refine((file)=>{
    if(!file) return false
    return file.size<=MAX_IMAGE_SIZE
  },{message:"Images more then 5MBs are not allowed."}).refine((file)=>{
    if(!file){
        return false;
    } 
    return imageMimeTypes.includes(file.type)
  },{message:"Only .jpg, .jpeg, .png and .webp formats are supported."}),
  lesson_title:z.string().min(10,"Title must have atleast 10 characters").max(150,"Title must be precise and brief. Must be less then 100 chars."),
  lesson_text:z.string().min(1,"Lesson details are requried"),
  quiz:QuizAndAssignmentSchema.optional(),
  assignment:QuizAndAssignmentSchema.optional()
});

const submitCourseSchema=z.object({
  lesson_image:z.string(),
  lesson_video:z.string(),
  lesson_document:z.string(),
  lesson_title:z.string(),
  lesson_text:z.string(),
  courseId:z.string().optional(),
  quiz:QuizAndAssignmentSchema.optional(),
  assignment:QuizAndAssignmentSchema.optional()
})

export type submitCourseType=z.infer<typeof submitCourseSchema>
export type CreateLessonType=z.infer<typeof createLessonSchema>

export const createLessonDefaultValues:CreateLessonType={
    lesson_text:"",
    lesson_title:"",
    lesson_document:undefined,
    lesson_image:undefined,
    lesson_video:undefined
}
