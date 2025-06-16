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
  lesson_video: z.string().optional(),
  lesson_document: z
    .custom<File | undefined>((file) => {
      if (!file) return true;
      return file instanceof File;
    }, {
      message: "Invalid lesson document."
    })
    .refine((file) => {
      if (!file) return true;
      return file.size <= MAX_DOC_SIZE;
    }, {
      message: "Documents more than 10MBs are not allowed."
    })
    .refine((file) => {
      if (!file) return true;
      return documentMimeTypes.includes(file.type);
    }, {
      message: "Only PDF, MS Word, and PowerPoint formats are supported."
    })
    .optional(),

  lesson_document2: z
    .custom<File | undefined>((file) => {
      if (!file) return true;
      return file instanceof File;
    }, {
      message: "Invalid lesson document 2."
    })
    .refine((file) => {
      if (!file) return true;
      return file.size <= MAX_DOC_SIZE;
    }, {
      message: "Documents more than 10MBs are not allowed."
    })
    .refine((file) => {
      if (!file) return true;
      return documentMimeTypes.includes(file.type);
    }, {
      message: "Only PDF, MS Word, and PowerPoint formats are supported."
    })
    .optional(),

  lesson_title: z
    .string()
    .min(10, "Title must have at least 10 characters")
    .max(150, "Title must be concise and less than 150 characters."),

  lesson_text: z
    .string()
    .min(1, "Lesson details are required"),

  quiz: QuizAndAssignmentSchema.optional(),
  assignment: QuizAndAssignmentSchema.optional()
});


const submitCourseSchema=z.object({
  lesson_document2:z.string(),
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
    lesson_document2:undefined,
    lesson_video:undefined
}
