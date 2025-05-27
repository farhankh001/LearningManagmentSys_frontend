import z from "zod";


const documentMimeTypes = [
  "application/pdf",
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/vnd.ms-powerpoint", // .ppt
  "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
];
const MAX_FILE_SIZE = 5* 1024 * 1024;
const quizAndAssignmentFile = z.union([
  // Case 1: File validation
  z
    .custom<File>((file) => file instanceof File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File size must be less than 2MB",
    })
    .refine((file) => documentMimeTypes.includes(file.type), {
      message: "pdf, ms-word and ms-powerpoint is supported.",
    }),

  // Case 2: URL validation for string
  z
    .string(),
]);

export const quizAndAssignmentSchema=z.object({
    solution_text:z.string().min(1,"Quiz text is Required. If you are submitting doc as answer, write your name here."),
    quizAndAssignmentFile:quizAndAssignmentFile.optional()
})

export type QuizAndAssignmentFormType=z.infer<typeof quizAndAssignmentSchema>

export const QuizAndAssignmentFormDefault:QuizAndAssignmentFormType={
    solution_text:"",
    quizAndAssignmentFile:""
}